import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 1. jsx表达式。表达式就是变量、常量、操作符混合在一起的组合。表达式是可以计算的，而且肯定会有一个返回值
 * jsx 更新JS
 * class => className  for => htmlFor
 */

let title = 'hello';
let style = { backgroundColor: 'green', color: 'orange' };
let element = <h1 style={style}>{title}</h1>

ReactDOM.render(
  element,
  document.getElementById('root')
);


