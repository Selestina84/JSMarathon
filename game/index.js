import {HIT, ATTACK, LOGS, $arenas, $formFight} from '/constans/index.js';
import Player from '/players/index.js';
import {getRandom, createElement, getTime, insertChat} from '/utils/index.js'
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

generateLogs = (type, {name: name1}, {name: name2}, player, value) => {
  
  switch (type){
    case 'start':
      insertChat(LOGS[type].replace('[time]', getTime()).replace('[player1]', name1).replace('[player2]', name2)); 
      break;
    case 'hit': 
      insertChat(`${getTime()} ${LOGS[type][getRandom(logs.hit.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} -${value} [${player.hp}/100]`);
      break;
    case 'defence':
      insertChat(`${getTime()} ${LOGS[type][getRandom(logs.defence.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} `);
      break;
    case 'draw':
      insertChat(`${getTime()} ${LOGS[type]}`);
      break;
    case 'end':
      insertChat( `${getTime()} ${LOGS[type][getRandom(logs.end.length)-1].replace('[playerWins]', name1).replace('[playerLose]', name2)}`);
      break;
    default:
       insertChat("Что то пошло не так. Перезагрузите страницу!");
       break;

  }
} 

 showResult = () => {
 if (this.player1.hp === 0 || this.player2.hp === 0){
  document.querySelector('.buttonWrap .button').style.backgroundColor = 'grey';
  document.querySelector('.buttonWrap .button').disabled = true;
  createReloadButton();
 }
 if (this.player1.hp === 0 && this.player1.hp < this.player2.hp){
   this.showResultText(this.player2.name);
   this.generateLogs('end', this.player2, this.player1);
 }
 else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp){
   this.showResultText(this.player1.name);
   this.generateLogs('end', this.player1, this.player2);
 }

 else if (this.player2.hp === 0 && this.player2.hp === 0) {
   this.showResultText();
   this.generateLogs('draw');
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

start = () => {
 this.generateLogs('start', this.player1, this.player2);
 this.player1.createPlayer();
 this.player1.changeHp();
 this.player1.elHp();
 this.player1.renderHp();
 this.player2.createPlayer();
 this.player2.changeHp();
 this.player2.elHp();
 this.player2.renderHp();
 $formFight.addEventListener('submit', function(e){
  e.preventDefault();
  console.log(this.enemyAttack)
  const enemy = this.enemyAttack();
  const player = this.playerAttack();
 
  if (enemy.hit !== player.defence){
    this.player1.changeHp(enemy.value);
    this.player1.renderHp();
    this.generateLogs('hit', this.player2, this.player1, this.player1, enemy.value);
  }
  if(player.hit !== enemy.defence){
    player2.changeHp(player.value);
    player2.renderHp();
    this.generateLogs('hit', this.player1, this.player2, this.player2, player.value);
  }
  if(player.hit === enemy.defence ){
    this.generateLogs('defence', this.player1, this.player2);
  }
  if(enemy.hit === player.defence){
    this.generateLogs('defence', this.player2, this.player1);
  }
  this.showResult();

})

}
}
 export default Game;