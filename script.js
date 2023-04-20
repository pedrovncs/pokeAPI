const effectNegative = new Audio('assets/negativeEffect.mp3')
const effectPositive = new Audio('assets/positiveEffect.mp3');
const qS = _ => document.querySelector(_);
qS('#search').addEventListener('click', getPoke);
qS('#pokeName').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') getPoke();
})

function upFL(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getPoke() {
    const name = qS('#pokeName').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            const idPoke = data.id;
            const types = data.types.map(type => type.type.name);
            const imgPoke = data.sprites.front_default;
            const imgPokeShiny = data.sprites.front_shiny;
            const namePoke = upFL(data.name);
            const weightPoke = data.weight;
            const heightPoke = data.height;
            fetch(data.species.url)
                .then(response => response.json())
                .then(dataSpecie => {
                    const color = dataSpecie.color.name;
                    const description = dataSpecie.flavor_text_entries[1].flavor_text;
                    const genPoke = dataSpecie.generation.name.slice(11).toUpperCase();

                    effectPositive.play();
                    qS('.imageScreen').innerHTML =
                        `
                        <img src="${imgPoke}" alt="${namePoke} sprite">
                        <div>
                        <span>#${idPoke}</span>
                        <h3>${namePoke}</h3>
                        <div class='typeContainer'>
                        <img src='assets/poketypes/${types[0]}.png' alt='${types[0]}'  onerror="this.style.display='none'" > 
                        <img src='assets/poketypes/${types[1]}.png' alt='${types[1]}'  onerror="this.style.display='none'" > 
                        </div>
                        `
                    qS('.imageScreen').style = `background-image: linear-gradient(${color}, white);`;

                    qS('.dataScreen').innerHTML =
                        `
                        <h4>DESCRIPTION: </h4>
                        <p>${description}</p>
                        <h4>WEIGHT: </h4> 
                        <p>${weightPoke / 10}kg</p>
                        <h4>HEIGHT: </h4>
                        <p>${heightPoke / 10}m</p>
                        <h4>GENERATION:${genPoke}</h4>
                        `
                })
        })
        .catch((error) => {
            effectNegative.play();
            qS(".imageScreen").innerHTML = '<h3>Pokemon não encontrado 😭<h2>';
            qS(".imageScreen").style = `background-color: white`
            qS(".dataScreen").innerHTML = null

            console.log('nao encontrado: ' + ' ' + error)
        })
}

