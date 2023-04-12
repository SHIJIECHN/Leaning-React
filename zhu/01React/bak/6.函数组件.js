import React from 'react';
import ReactDOM from './react-dom';

/** 函数组件其实是一个函数，接收一个props，返回一个React元素 */
function FunctionWelcome(props) {
  // return <h1>hello, {props.name}</h1>
  return React.createElement('h1', {}, 'hello,', props.name)
}
// let element = <FunctionWelcome name="zf" />;
let element = React.createElement(FunctionWelcome, { name: 'zf' })
console.log(element)
ReactDOM.render(element, document.getElementById('root'));

