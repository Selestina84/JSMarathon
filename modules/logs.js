import {getTime, getRandom, insertChat} from './utils.js';
import {logs} from './storage.js';
  function generateLogs(type, {name: name1}, {name: name2}, player, value){
  
   switch (type){
     case 'start':
       insertChat(logs[type].replace('[time]', getTime()).replace('[player1]', name1).replace('[player2]', name2)); 
       break;
     case 'hit': 
       insertChat(`${getTime()} ${logs[type][getRandom(logs.hit.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} -${value} [${player.hp}/100]`);
       break;
     case 'defence':
       insertChat(`${getTime()} ${logs[type][getRandom(logs.defence.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} `);
       break;
     case 'draw':
       insertChat(`${getTime()} ${logs[type]}`);
       break;
     case 'end':
       insertChat( `${getTime()} ${logs[type][getRandom(logs.end.length)-1].replace('[playerWins]', name1).replace('[playerLose]', name2)}`);
       break;
     default:
        insertChat("Что то пошло не так. Перезагрузите страницу!");
        break;

   }
 }
 
export {generateLogs};
 
 

