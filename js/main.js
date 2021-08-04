var $click = document.querySelector('.main-pika');
var $main = document.querySelector('.container');
var $search = document.querySelector('.main-search');
var $views = document.querySelectorAll('.view');
var $switch = document.querySelector('body');
var $title = document.querySelector('.main-header-search');
var $head = document.querySelector('.main-head');

$search.addEventListener('search', searchFunction);

function searchFunction() {
  var searchValue = document.querySelector('.main-search');
  getPokemonData(searchValue.value);
  document.getElementById('refresh').value = '';
}

$click.addEventListener('click', searchFunction);

$click.addEventListener('click', function (event) {
  $switch.className = 'switch-out';
  $title.className = 'new-main-header-search';
  $head.className = 'new-main-head';
  showView('pokePair');
});

function showView(viewMode) {
  for (var i = 0; i < $views.length; i++) {
    var view = $views[i];
    if (view.getAttribute('data-view') === viewMode) {
      view.className = 'view';
    } else {
      view.className = 'view hidden';
    }
  }
}

function getPokemonData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var pokemon = xhr.response;

    var newPokemon = {
      name: pokemon.name,
      sprite: pokemon.sprites.other['official-artwork'].front_default,
      health: pokemon.stats[0].base_stat,
      attack: pokemon.stats[1].base_stat,
      defend: pokemon.stats[2].base_stat,
      specialAtk: pokemon.stats[3].base_stat,
      specialDef: pokemon.stats[4].base_stat,
      speed: pokemon.stats[5].base_stat
    };

    $main.appendChild(addEntry(newPokemon));
  });
  xhr.send();
}
function addEntry(newPokemon) {
  var row = document.createElement('div');
  row.className = 'poke-row';

  var column = document.createElement('div');
  column.className = 'pokemon';
  row.appendChild(column);

  var header = document.createElement('div');
  header.className = 'column-header';
  column.appendChild(header);

  var favorite = document.createElement('div');
  favorite.className = 'favorite';
  header.appendChild(favorite);

  var buttonOne = document.createElement('button');
  favorite.appendChild(buttonOne);

  var imgOne = document.createElement('img');
  buttonOne.appendChild(imgOne);
  imgOne.setAttribute('src', './images/CloseHeart.jpeg');

  var exit = document.createElement('div');
  exit.className = 'close';
  header.appendChild(exit);

  var buttontwo = document.createElement('button');
  exit.appendChild(buttontwo);

  var imgtwo = document.createElement('img');
  buttontwo.appendChild(imgtwo);
  imgtwo.className = 'exit';
  imgtwo.setAttribute('src', '/images/x2.png');

  var newsprite = document.createElement('img');
  column.appendChild(newsprite);
  newsprite.className = 'pokemonimg';
  newsprite.setAttribute('src', newPokemon.sprite);

  var newname = document.createElement('p');
  column.appendChild(newname);
  newname.textContent = newPokemon.name.charAt(0).toUpperCase() + newPokemon.name.substring(1);

  var tablecontain = document.createElement('div');
  tablecontain.className = 'table';
  column.appendChild(tablecontain);

  var table = document.createElement('table');
  tablecontain.appendChild(table);

  var rowOne = document.createElement('tr');
  table.appendChild(rowOne);

  var health = document.createElement('td');
  rowOne.appendChild(health);
  health.textContent = `HP: ${newPokemon.health}`;

  var attack = document.createElement('td');
  rowOne.appendChild(attack);
  attack.textContent = `Atk: ${newPokemon.attack}`;

  var rowTwo = document.createElement('tr');
  table.appendChild(rowTwo);

  var speed = document.createElement('td');
  rowTwo.appendChild(speed);
  speed.textContent = `Spd: ${newPokemon.speed}`;

  var specialAtk = document.createElement('td');
  rowTwo.appendChild(specialAtk);
  specialAtk.textContent = `SpAtk: ${newPokemon.specialAtk}`;

  var rowThree = document.createElement('tr');
  table.appendChild(rowThree);

  var defense = document.createElement('td');
  rowThree.appendChild(defense);
  defense.textContent = `Def: ${newPokemon.defend}`;

  var specialDef = document.createElement('td');
  rowThree.appendChild(specialDef);
  specialDef.textContent = `SpDef: ${newPokemon.specialDef}`;

  return row;
}
$main.addEventListener('click', function (event) {
  if (event.target.className !== 'exit') {
    return;
  }
  var $list = event.target.closest('.poke-row');
  $list.remove();
});
