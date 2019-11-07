// let pokemon_id = prompt('Choose your pokémon!');
let pokemon_id = getRandomInt(1, 807);
let rival_id = getRandomInt(1, 807);

function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function drawPokemon() {
    $('#pokemons').append(`
        <img class="pokemon user" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon_id}.png"  width="${innerWidth/3}" alt=""></img>
        <img class="pokemon rival" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${rival_id}.png"  width="${innerWidth/3}" alt=""></img>    
    `)
}

drawPokemon();

function getAttacks() {
    $('#info-panel').empty();
    $('#info-panel').append('<ul class="attacks"></ul>')
    $.ajax({

        'url' : `https://pokeapi.co/api/v2/pokemon/${pokemon_id}/`,
        'type' : 'GET',
        'success' : function(data) {              
            console.log(data.abilities[0].ability.name);
            data.abilities.forEach( attack => {
                $('.attacks').append(`<li class="attack">${attack.ability.name}</li>`)
            })
        },
        'error' : function(request,error)
        {
            console.log(error)
        }
    });

}

getAttacks();

$(document).on('click', '.attack', function() {
    // $('#info-panel').empty();
    $('#info-panel').text(`You used ${$(this).text()} it was super effective!`);
})
