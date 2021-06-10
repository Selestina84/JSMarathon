window.addEventListener('DOMContentLoaded', function () {
  const $arenas = document.querySelector('.arenas');
  const $randomButton = document.querySelector('.control>.button');
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
    $arenas.appendChild($winTitle);
   
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

  $randomButton.addEventListener('click',function(){
    player1.changeHp(getRandom(20));
    player1.renderHp();
    player2.changeHp(getRandom(20));
    player2.renderHp();
  if (player1.hp === 0 || player2.hp === 0){
    $randomButton.style.backgroundColor = 'grey';
    $randomButton.disabled = true;
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