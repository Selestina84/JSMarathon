  import {player1, player2, enemyAttack, playerAttack} from './modules/players.js';
  import { createPlayer, showResult } from './modules/elements.js';
  import { generateLogs } from './modules/logs.js';
  import { $arenas, $formFight } from './modules/storage.js';
  
 
  generateLogs('start', player1, player2);

  $arenas.appendChild(createPlayer(player1));
  $arenas.appendChild(createPlayer(player2));

 
  $formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();
   
    if (enemy.hit !== player.defence){
      player1.changeHp(enemy.value);
      player1.renderHp();
      generateLogs('hit', player2, player1, player1, enemy.value);
    }
    if(player.hit !== enemy.defence){
      player2.changeHp(player.value);
      player2.renderHp();
      generateLogs('hit', player1, player2, player2, player.value);
    }
    if(player.hit === enemy.defence ){
      generateLogs('defence', player1, player2);
    }
    if(enemy.hit === player.defence){
      generateLogs('defence', player2, player1);
    }
    showResult();

  })


