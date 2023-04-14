const qS = _ => document.querySelector(_);
qS('#search').addEventListener('click', getPoke);

function upFL(str){
    return str.charAt(0).toUpperCase()+str.slice(1);
}

function getPoke(){
const name = qS('#pokeName').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((response) => response.json())
    .then((data)=> {
        qS('.pokeBox').innerHTML = 
       `<div>
            <img src="${data.sprites.other["official-artwork"].front_default}"
            alt="${data.name}">
        </div>
        <div class="pokeInfo">
            <h1>${upFL(data.name)}</h1>
            <p>Descrição</p>
        </div>`
    })
    .catch((error) => { 
        qS(".pokeBox").innerHTML = '<h2>Pokemon não encontrado 😭<h2>';
        console.log('nao encontrado' + ' ' + error)
    
    });
}
