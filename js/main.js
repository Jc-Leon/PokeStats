var $click = document.querySelector('.pika');

$click.addEventListener('click', function (event) {
  var screen = document.body;
  var $main = document.querySelector('.header-search');
  screen.classList.toggle('switch-out');
  $main.classList.toggle('hide');
});

var pikachu = getPokemonData('drowzee');

function Pokestat(stat, value) {
  this.stat = stat;
  this.value = value;
}

function Pokemonew(name, stats, sprite) {
  this.name = name;
  this.stat = stats;
  this.sprite = sprite;
}

function getPokemonData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    var pokemonName = xhr.response.name;
    console.log(pokemonName);
    var sprite = xhr.response.sprites.other['official-artwork'].front_default;
    console.log(sprite);
    var stats = [];
    for (var i = 0; i < xhr.response.stats.length; i++) {
      stats.push(
        new Pokestat(
          xhr.response.stats[i].stat.name,
          xhr.response.stats[i].base_stat
        )
      );
      console.log(xhr.response.stats[i]);
    }

    pikachu = new Pokemonew(pokemonName, stats, sprite);
    console.log(pikachu);
  });
  xhr.send();
}
