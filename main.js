window.addEventListener('DOMContentLoaded', function () {
  const $arenas = document.querySelector('.arenas');
  const $randomButton = document.querySelector('.button');
  const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    }
  };
  const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    }
  };
  function createElement(tag, className){
    $tag = document.createElement(tag);
    if(className){
      $tag.classList.add(className);
    }
   
    return $tag;
  }

  function createPlayer(obj) {
    const $player = createElement('div', `player${obj.player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $character = createElement('div', 'character');
    const $playerImg = createElement('img');

    $life.style.width = `${obj.hp}%`;
    $playerImg.src = obj.img;
    $name.innerHTML = obj.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $player.appendChild($progressbar);
    $character.appendChild($playerImg);
    $player.appendChild($character);
    
    return $player;
  };

  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));
  
  function playerWin(name){
    const $winTitle = createElement('div', 'winTitle');
    if(name){
      $winTitle.innerHTML = name + ' win!!!';
    }
    else {
      $winTitle.innerHTML = 'Game over! Tie!';
    }
   
    $arenas.appendChild($winTitle);
    $randomButton.style.backgroundColor = 'grey';
    $randomButton.disabled = true;
  }

  function changeHp(player){
    const $playerLife = document.querySelector('.player'+player.player + ' .life');
  
    player.hp -= Math.ceil(Math.random()*20);

    if(player.hp <= 0){
      $playerLife.style.width = '0%';
    }
    else {
      $playerLife.style.width = `${player.hp}%`;
    }
   return player.hp;
  }

  function getWinner(player){
    let winner = false;
    if(player.hp<=0){
      winner = false;
    } else winner = true;
    return winner;
  }

  $randomButton.addEventListener('click',function(){
    changeHp(player1);
    changeHp(player2);
    if (!getWinner(player1) && getWinner(player2)){
      playerWin(player2.name)
    } if (!getWinner(player2) && getWinner(player1)){
      playerWin(player1.name)
    } if (!getWinner(player1) && !getWinner(player2)){
      playerWin();
    } else return;

  })

});