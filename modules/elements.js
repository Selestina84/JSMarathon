import { createElement } from "./utils.js";
import {player1, player2} from './players.js';
import {$arenas} from './storage.js';
import { generateLogs} from './logs.js';
function createPlayer({player,name,hp,img}) {
 const $player = createElement('div', `player${player}`);
 const $progressbar = createElement('div', 'progressbar');
 const $life = createElement('div', 'life');
 const $name = createElement('div', 'name');
 const $character = createElement('div', 'character');
 const $playerImg = createElement('img');

 $life.style.width = `${hp}%`;
 $playerImg.src = img;
 $name.innerHTML = name;

 $progressbar.appendChild($life);
 $progressbar.appendChild($name);
 $player.appendChild($progressbar);
 $character.appendChild($playerImg);
 $player.appendChild($character);
 
 return $player;
};

function createReloadButton(){
 const $reloadWrap = createElement('div', 'reloadWrap');
 const $reloadButton = createElement('button', 'button');
 $reloadButton.innerHTML = 'Restart';
 $reloadWrap.appendChild($reloadButton);
 document.querySelector('.arenas').appendChild($reloadWrap)
 $reloadButton.addEventListener('click',function(){
   window.location.reload();
 } )
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
function showResult(){
 if (player1.hp === 0 || player2.hp === 0){
  document.querySelector('.buttonWrap .button').style.backgroundColor = 'grey';
  document.querySelector('.buttonWrap .button').disabled = true;
  createReloadButton();
 }
 if (player1.hp === 0 && player1.hp < player2.hp){
   showResultText(player2.name);
   generateLogs('end', player2, player1);
 }
 else if (player2.hp === 0 && player2.hp < player1.hp){
   showResultText(player1.name);
   generateLogs('end', player1, player2);
 }

 else if (player2.hp === 0 && player2.hp === 0) {
   showResultText();
   generateLogs('draw');
 }
}

export {createPlayer, createReloadButton,showResultText, showResult}