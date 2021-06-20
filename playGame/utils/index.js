const getRandom = (n) =>  Math.ceil(Math.random()*n);

const createElement = (tag, className) => {
 const $tag = document.createElement(tag);
 if(className){
   $tag.classList.add(className);
 }

 return $tag;
}
 
const getTime = () =>{
 const date = new Date();
 const normalize = (num) =>(num >= 10 ? num : `0${num}`);
 return `${normalize(date.getHours())}:${normalize(date.getMinutes())}:${normalize(date.getSeconds())}`;

}

const insertChat = (text) =>{
 let el = `<p>${text}</p>`;
 document.querySelector('.chat').insertAdjacentHTML('beforeend', el);
}

 async function api(adress, method, data) {
   let answer;
  switch(method){
    case 'GET':
      answer = await fetch(adress).then(res => res.json());
      console.log(answer);
      return answer;
    case 'POST':
        answer = await fetch(adress, {
          body: JSON.stringify(data)
        }).then(res => res.json());
        console.log(answer);
        return answer;
    default:
      console.log('Что то пошло не так');
  }
}

export {getRandom, createElement, getTime, insertChat, api}