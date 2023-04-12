import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 元素的更新
 * React元素本身是不可变的
 */

let element = <h1 id="title">hello</h1>
console.log(element)
ReactDOM.render(
  element,
  document.getElementById('root')
);

/**
 * react元素是不可扩展的
 */
// Uncaught TypeError: Cannot add property id, object is not extensible
setTimeout(() => {
  element.id = "id";
  ReactDOM.render(
    element, document.getElementById('root')
  )
}, 1000)

