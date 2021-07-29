var $click = document.querySelector('.main-pika');
var $modal = document.querySelector('.modal');
var $main = document.querySelector('.container');
var $search = document.querySelector('.main-search');

$search.addEventListener('search', searchFunction);

function searchFunction() {
  var searchValue = document.querySelector('.main-search');
  getPokemonData(searchValue.value);
}

$click.addEventListener('click', searchFunction);

$click.addEventListener('click', function (event) {
  var screen = document.body;
  var $main = document.querySelector('.main-header-search');

  screen.classList.toggle('switch-out');
  $main.classList.toggle('hidden');
});
function openModal(event) {
  $modal.className = 'modal';
}
$click.addEventListener('click', openModal);

function Pokemonew(name, sprite, hp, atk, def, spatk, spdef, spd) {
  this.name = name;
  this.sprite = sprite;
  this.hp = hp;
  this.atk = atk;
  this.def = def;
  this.spatk = spatk;
  this.spdef = spdef;
  this.spd = spd;
}

function getPokemonData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);
    var pokemonName = xhr.response.name;
    // console.log(pokemonName);
    var sprite = xhr.response.sprites.other['official-artwork'].front_default;
    // console.log(sprite);
    var stats = [];
    for (var i = 0; i < xhr.response.stats.length; i++) {
      stats.push(xhr.response.stats[i].base_stat);
      // console.log(xhr.response.stats[i]);
    }
    var pokemon = new Pokemonew(
      pokemonName,
      sprite,
      stats[0],
      stats[1],
      stats[2],
      stats[3],
      stats[4],
      stats[5]
    );
    addEntry(
      pokemon.name,
      pokemon.sprite,
      pokemon.hp,
      pokemon.atk,
      pokemon.def,
      pokemon.spatk,
      pokemon.spdef,
      pokemon.spd
    );
  });
  xhr.send();
}
function addEntry(name, sprite, hp, atk, def, spatk, spdef, spd) {
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
  imgtwo.setAttribute('src', '/images/x2.png');

  var newsprite = document.createElement('img');
  column.appendChild(newsprite);
  newsprite.className = 'pokemonimg';
  newsprite.setAttribute('src', sprite);

  var newname = document.createElement('p');
  column.appendChild(newname);
  newname.textContent = name.charAt(0).toUpperCase() + name.substring(1);

  var tablecontain = document.createElement('div');
  tablecontain.className = 'table';
  column.appendChild(tablecontain);

  var table = document.createElement('table');
  tablecontain.appendChild(table);

  var rowOne = document.createElement('tr');
  table.appendChild(rowOne);

  var health = document.createElement('td');
  rowOne.appendChild(health);
  health.textContent = `HP: ${hp}`;

  var attack = document.createElement('td');
  rowOne.appendChild(attack);
  attack.textContent = `Atk: ${atk}`;

  var rowTwo = document.createElement('tr');
  table.appendChild(rowTwo);

  var speed = document.createElement('td');
  rowTwo.appendChild(speed);
  speed.textContent = `Spd: ${spd}`;

  var specialAtk = document.createElement('td');
  rowTwo.appendChild(specialAtk);
  specialAtk.textContent = `SpAtk: ${spatk}`;

  var rowThree = document.createElement('tr');
  table.appendChild(rowThree);

  var defense = document.createElement('td');
  rowThree.appendChild(defense);
  defense.textContent = `Def: ${def}`;

  var specialDef = document.createElement('td');
  rowThree.appendChild(specialDef);
  specialDef.textContent = `SpDef: ${spdef}`;

  $main.appendChild(row);
}
