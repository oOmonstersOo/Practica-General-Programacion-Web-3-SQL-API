/* DIGIMON
    SIN IMAGENES
    TODOS
*/
async function buscarDig() {
    const tipo = document.getElementById('tipobusqueda').value;
    const valor = document.getElementById('valorbusqueda').value.trim();
    let url = 'https://digimon-api.vercel.app/api/digimon';
    if(tipo === 'name' && valor) url += `/name/${valor}`;
    if(tipo === 'level' && valor) url += `/level/${valor}`;

    const res = await fetch(url);
    const data = await res.json();
    const cuerpo = document.querySelector(`#tablaDigimon tbody`);
    cuerpo.innerHTML='';
    if(!Array.isArray(data)){
        cuerpo.innerHTML='<tr><td colspan="2">No se encontraron resultados</td></tr>'
        return;
    }
    data.forEach(d => {
        const fila = `<tr><td>${d.name}</td><td>${d.level}</td></tr>`;
        cuerpo.innerHTML += fila;
    });
    
}

/* POKEMON */
let pagina =0;
let pokemons=[];
async function cargarPok(){
    const offset = pagina * 20;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
    const data = await res.json();
    const lista = data.results;

    pokemons = await Promise.all(lista.map(async p => {
        const det = await fetch(p.url).then(r => r.json());
        return { nombre: p.name, imagen: det.sprites.front_default };
    }));
    mostrarPokemon(pokemons);
}
function mostrarPokemon(lista){
    const cont = document.getElementById('galeria');
    cont.innerHTML='';
    lista.forEach(p => {
        cont.innerHTML+= `
            <div class="card">
                <img src="${p.imagen}" alt="${p.nombre}"></img>
                <div>${p.nombre}</div>
            </div>`;
    });
}
function filtralpok(){
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const filtrados = pokemons.filter(p => p.nombre.includes(filtro));
    mostrarPokemon(filtrados);
}

function paginaSig(){
    pagina++;
    cargarPok();
}
function paginaAnt(){
    if(pagina > 0) pagina--;
    cargarPok();
}

cargarPok();