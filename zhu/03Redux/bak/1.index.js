// import React from 'react';
// import ReactDOM from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <div>123</div>
//   </React.StrictMode>
// );

import {createStore} from './redux';

let counterValue = document.getElementById('counterValue');
let counterAdd = document.getElementById('counterAdd');
let counterMinus = document.getElementById('counterMinus');

/**
 * 处理器函数
 * @param {*} state 老状态
 * @param {*} action 动作对象，也是一个普通的JS对象，必须有一个type属性，用来标识你要做什么
 */
function reducer(state=0, action){
  switch(action.type){
    case 'ADD':
      return state +1;
    case 'MINUS':
      return state -1;
    default:
      return state;
  }
}

let store = createStore(reducer);
function render(){
  counterValue.innerHTML = store.getState();
}
render();
store.subscribe(render);
counterAdd.addEventListener('click',()=>{
  store.dispatch({type: 'ADD'})
})
counterMinus.addEventListener('click',()=>{
  store.dispatch({type: 'MINUS'})
})


