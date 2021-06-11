window.addEventListener('DOMContentLoaded', function () {
  const $arenas = document.querySelector('.arenas');
  const $formFight = document.querySelector('.control');
  const $buttonFight = document.querySelector('.buttonWrap .button');

  const player1 = {
    player: 1,
    name: 'Kitana',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    },
    changeHp,
    elHp,
    renderHp
  };
  const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [],
    attak: function () {
      console.log(`${this.name} Fight...`)
    },
    changeHp,
    elHp,
    renderHp
  };

  const HIT = {
    head: 30,
    body: 25,
    foot: 20,
 };
 const ATTACK = ['head', 'body', 'foot'];

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

  function getRandom(n){
    return Math.ceil(Math.random()*n);
  }
  
  function showResultText(name){
    const $winTitle = createElement('div', 'winTitle');
    if(name){
      $winTitle.innerHTML = name + ' win!!!';
    }
    else {
      $winTitle.innerHTML = 'draw!';
    }
    $arenas.prepend($winTitle);
   
  }
  
  function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerHTML = 'Restart';
    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap)
    $reloadButton.addEventListener('click',function(){
      window.location.reload();
    } )
  }
 

  function changeHp(n){
    this.hp-=n;
    if(this.hp<=n){
      this.hp = 0;
    }

    return this.hp;
  }

  function elHp(){
    return document.querySelector(`.player${this.player} .life`);
  }

  function renderHp(){
  
      this.elHp().style.width = `${this.hp}%`;

  }
function enemyAttack(){
  const hit = ATTACK[getRandom(3)-1];
  const defence = ATTACK[getRandom(3)-1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence
  }
}

  $formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for (let item of $formFight){
      if (item.checked && item.name === 'hit'){
        attack.value = getRandom(HIT[item.value]);
        attack.hit = item.value;
      }
      if (item.checked && item.name === 'defence'){
        attack.defence = item.value
      }
      item.checked = false;
    }
   
    if (enemy.hit !== attack.defence){
      player1.changeHp(enemy.value);
      player1.renderHp();
    }
    if(attack.hit !== enemy.defence){
      player2.changeHp(attack.value);
      player2.renderHp();
    }
    if (player1.hp === 0 || player2.hp === 0){
      $buttonFight.style.backgroundColor = 'grey';
      $buttonFight.disabled = true;
     createReloadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp){
      showResultText(player2.name)
    }
    else if (player2.hp === 0 && player2.hp < player1.hp){
      showResultText(player1.name)
    }
  
    else if (player2.hp === 0 && player2.hp === 0) {
      showResultText();
    }
  })


});