import {LOGS} from '/playGame/constans/index.js';
import {getRandom, getTime, insertChat} from '/playGame/utils/index.js';

const generateLogs = (type, {name: name1}, {name: name2}, player, value) => {

 switch (type){
   case 'start':
     insertChat(LOGS[type].replace('[time]', getTime()).replace('[player1]', name1).replace('[player2]', name2)); 
     break;
   case 'hit': 
     insertChat(`${getTime()} ${LOGS[type][getRandom(LOGS.hit.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} -${value} [${player.hp}/100]`);
     break;
   case 'defence':
     insertChat(`${getTime()} ${LOGS[type][getRandom(LOGS.defence.length)-1].replace('[playerKick]', name1).replace('[playerDefence]', name2)} `);
     break;
   case 'draw':
     insertChat(`${getTime()} ${LOGS[type]}`);
     break;
   case 'end':
     insertChat( `${getTime()} ${LOGS[type][getRandom(LOGS.end.length)-1].replace('[playerWins]', name1).replace('[playerLose]', name2)}`);
     break;
   default:
      insertChat("Что то пошло не так. Перезагрузите страницу!");
      break;

 }
} 
 export default generateLogs;
