import {HIT, ATTACK, $arenas, $formFight} from '/playGame/constans/index.js';
import Player from '/playGame/players/index.js';
import {getRandom, createElement, api} from '/playGame/utils/index.js';
import generateLogs from '/playGame/logs/index.js';
let player1 = JSON.parse(localStorage.getItem('player1'));
let player2 = await api('https://reactmarathon-api.herokuapp.com/api/mk/player/choose', 'GET');

class Game {
  constructor(){
  this.player1 = new Player({
   ...player1,
   player: 1,
   rootSelector: 'arenas',
  }) 
  this.player2 = new Player({
   ...player2,
   player: 2,
   rootSelector: 'arenas'
  })
 }; 


 showResult = () => {
 if (this.player1.hp === 0 || this.player2.hp === 0){
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
/* enemyAttack = () =>{
 const hit = ATTACK[getRandom(3)-1];
 const defence = ATTACK[getRandom(3)-1];
 return {
   value: getRandom(HIT[hit]),
   hit,
   defence
 }
} */
 formData = () => {
 const data = {};

 for (let item of $formFight){
   if (item.checked && item.name === 'hit'){

     data.hit = item.value;
   }
   if (item.checked && item.name === 'defence'){
     data.defence = item.value
   }
   item.checked = false;
 }
 return data;
}

getPlayData = (data) => {
  let playData = await api('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', 'POST', data);
  let attack = {...playData};
  console.log(attack)
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
  console.log(this.getPlayData(this.formData()))
  let playData = this.getPlayData(this.formData());
  const enemy = playData.player1;
  const player = playData.player2;
  this.gamePlay(enemy, player);
})

}
}
 export default Game;