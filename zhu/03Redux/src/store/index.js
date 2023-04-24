import {createStore} from '../redux';
/**
 * 处理器函数
 * @param {*} state 老状态
 * @param {*} action 动作对象，也是一个普通的JS对象，必须有一个type属性，用来标识你要做什么
 */
let initialState = { number:0}
function reducer(state=initialState, action){
  switch(action.type){
    case 'ADD':
      return {number: state.number+1};
    case 'MINUS':
      return {number: state.number-1};
    default:
      return state;
  }
}

let store = createStore(reducer);

export default store;