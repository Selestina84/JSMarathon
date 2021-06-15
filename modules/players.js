 import { HIT, ATTACK, $formFight } from "./storage.js";
 import { getRandom } from "./utils.js";
 const player1 = {
 player: 1,
 name: 'Kitana',
 hp: 100,
 img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
 changeHp,
 elHp,
 renderHp
};
 const player2 = {
 player: 2,
 name: 'Subzero',
 hp: 100,
 img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
 changeHp,
 elHp,
 renderHp
};
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
 function playerAttack(){
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
 
export {player1, player2, enemyAttack, playerAttack}