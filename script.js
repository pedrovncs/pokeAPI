const qS = _ => document.querySelector(_);
qS('#search').addEventListener('click', getPoke);


function getPoke(){
const name = qS('#pokeName').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data)=> {
        qS('#pokeBox').innerHTML = 
       '<div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png"
                alt="Sprite Imagem">
        </div>
        <div class="pokeInfo">
            <h1>Lapras</h1>
            <p>Descrição</p>
        </div>'
    })
    .catch((error) => { console.log('nao encontrado' + '' + error)});
}
