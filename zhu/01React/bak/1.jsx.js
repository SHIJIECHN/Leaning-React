import React from 'react';
import ReactDOM from 'react-dom';

/**
 * React元素是构建React应用的最小单位，也就是所谓的虚拟DOM
 */

let el1 = <h1>Hello</h1>;

console.log(el1);

ReactDOM.render(
  el1,
  document.getElementById('root')
);


