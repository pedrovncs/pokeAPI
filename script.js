const qS = _ => document.querySelector(_);
qS('#search').addEventListener('click', getPoke);
qS('#pokeName').addEventListener('keypress', (event) => {
    if(event.key === 'Enter') getPoke();
})


function upFL(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPoke() {
    const name = qS('#pokeName').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            qS('.imageScreen').innerHTML = `
            <img src="${data.sprites.front_default}" alt="">
            <span>#${data.id}<span>
            <h4 class="nameTitle">${upFL(data.name)}</h4>`
            qS('.dataScreen').innerHTML = `
            <p><b>Type:</b></p><span>$}</span><br>
            <p><b>Height:</b></p><span>${data.height}</span><br>
            <p><b>Weight:</b></p><span>${data.weight}</span>
            <p><b>Gen:</b><span></span></p><br>
            <p><b>Description:</b></p><span></span><br>
        `
        })
        .catch((error) => {
            qS(".imageScreen").innerHTML = '<h3>Pokemon não encontrado 😭<h2>';
            console.log('nao encontrado' + ' ' + error)
        });
}
