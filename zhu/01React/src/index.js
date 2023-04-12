import React from './react';
import ReactDOM from './react-dom';

/**
 * 1. 实现createElement方法，返回一个react元素
 * 2. 实现render方法，把React元素变成真实的DOM插入到页面root中
 */
let element = (
  <div className='title' style={{ color: 'orange' }}>
    <span>hello</span> hello
  </div>
)
console.log(JSON.stringify(element, null, 2))
ReactDOM.render(element, document.getElementById('root'));

