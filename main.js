window.addEventListener('DOMContentLoaded', function () {
  const player1 = {
    name: 'Kitana',
    hp: 90,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    }
  };
  const player2 = {
    name: 'Subzero',
    hp: 80,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    }
  };
  const $arenas = document.querySelector('.arenas');

  function createPlayer(name, obj) {
    const $player = document.createElement('div');
    $player.classList.add(name);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = `${obj.hp}%`;
    $progressbar.appendChild($life);

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerHTML = obj.name;
    $progressbar.appendChild($name);

    $player.appendChild($progressbar);

    const $character = document.createElement('div');
    $character.classList.add('character');
    const $playerImg = document.createElement('img');
    $playerImg.src = obj.img;
    $character.appendChild($playerImg);

    $player.appendChild($character);
    $arenas.appendChild($player);

  };

  createPlayer('player1', player1);
  createPlayer('player2', player2);

});