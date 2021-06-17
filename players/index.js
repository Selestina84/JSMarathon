import {createElement} from '/utils/index.js';
class Player {
 constructor(props){
  this.name = props.name;
  this.hp = props.hp;
  this.img = props.img;
  this.player = props.player;
  this.selector = `player${this.player}`;
  this.rootSelector = props.rootSelector;
 }
  changeHp = (n) => {
  this.hp-=n;
  if(this.hp<=n){
    this.hp = 0;
  }
  return this.hp;
 }
 
  elHp = () => document.querySelector(`.${this.selector} .life`);

  renderHp = () => this.elHp().style.width = `${this.hp}%`;

  createPlayer = () => {
   const $player = createElement('div', `${this.selector}`);
   const $progressbar = createElement('div', 'progressbar');
   const $life = createElement('div', 'life');
   const $name = createElement('div', 'name');
   const $character = createElement('div', 'character');
   const $playerImg = createElement('img');
  
   $life.style.width = `${this.hp}%`;
   $playerImg.src = this.img;
   $name.innerHTML = this.name;
  
   $progressbar.appendChild($life);
   $progressbar.appendChild($name);
   $player.appendChild($progressbar);
   $character.appendChild($playerImg);
   $player.appendChild($character);
   
   document.querySelector(`.${this.rootSelector}`).appendChild($player)
   return $player;
  };

}

export default Player;