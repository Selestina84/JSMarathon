import {HIT, ATTACK, $arenas, $formFight} from '/constans/index.js';
import Player from '/players/index.js';
import {getRandom, createElement} from '/utils/index.js';
import generateLogs from '/logs/index.js';
class Game {
 constructor(){
  this.player1 = new Player({
   name: 'Kitana',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
   player: 1,
   rootSelector: 'arenas',
  }) 
  this.player2 = new Player({
   name: 'Subzero',
   hp: 100,
   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
   player: 2,
   rootSelector: 'arenas'
  })
 }



 showResult = () => {
 if (this.player1.hp === 0 || this.player2.hp === 0){
  document.querySelector('.buttonWrap .button').style.backgroundColor = 'grey';
  document.querySelector('.buttonWrap .button').disabled = true;
  this.createReloadButton();
 }
 if (this.player1.hp === 0 && this.player1.hp < this.player2.hp){
   this.showResultText(this.player2.name);
   generateLogs('end', this.player2, this.player1);
 }
 else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp){
   this.showResultText(this.player1.name);
   generateLogs('end', this.player1, this.player2);
 }

 else if (this.player2.hp === 0 && this.player2.hp === 0) {
   this.showResultText();
   generateLogs('draw', this.player1, this.player2);
 }
}
showResultText = (name) => {
 const $winTitle = createElement('div', 'winTitle');
 if(name){
   $winTitle.innerHTML = name + ' win!!!';
 }
 else {
   $winTitle.innerHTML = 'draw!';
 }
 $arenas.prepend($winTitle);

}
 createReloadButton = () =>{
 const $reloadWrap = createElement('div', 'reloadWrap');
 const $reloadButton = createElement('button', 'button');
 $reloadButton.innerHTML = 'Restart';
 $reloadWrap.appendChild($reloadButton);
 document.querySelector('.arenas').appendChild($reloadWrap)
 $reloadButton.addEventListener('click',function(){
   window.location.reload();
 } )
}
enemyAttack = () =>{
 const hit = ATTACK[getRandom(3)-1];
 const defence = ATTACK[getRandom(3)-1];
 return {
   value: getRandom(HIT[hit]),
   hit,
   defence
 }
}
 playerAttack = () => {
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
 return attack;

}

gamePlay = (enemy, player) => {
  if (enemy.hit !== player.defence){
    this.player1.changeHp(enemy.value);
    this.player1.renderHp();
    generateLogs('hit', this.player2, this.player1, this.player1, enemy.value);
  }
  if(player.hit !== enemy.defence){
    this.player2.changeHp(player.value);
    this.player2.renderHp();
    generateLogs('hit', this.player1, this.player2, this.player2, player.value);
  }
  if(player.hit === enemy.defence ){
    generateLogs('defence', this.player1, this.player2);
  }
  if(enemy.hit === player.defence){
    generateLogs('defence', this.player2, this.player1);
  }
  this.showResult();
}

start = () => {
 generateLogs('start', this.player1, this.player2);
 this.player1.createPlayer();
 this.player2.createPlayer();

 $formFight.addEventListener('submit', (e) => {
  e.preventDefault();
  const enemy = this.enemyAttack();
  const player = this.playerAttack();
  this.gamePlay(enemy, player);
})

}
}
 export default Game;