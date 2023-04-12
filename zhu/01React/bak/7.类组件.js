import React from './react';
import ReactDOM from './react-dom';

class ClassComponent extends React.Component {
  render() {
    return (
      // <h1 className='title' style={{ color: 'red' }}><span>hello</span>{this.props.name}</h1>
      React.createElement(
        'h1',
        { className: 'title', style: { color: 'red' } },
        React.createElement('span', {}, 'hello'),
        this.props.name
      )
    )
  }
}
let element = <ClassComponent name="zf" />;
console.log(element)
ReactDOM.render(element, document.getElementById('root'));

/**
 * 类组件的特性：
 * 组件分为内置组件和自定义组件
 * 内置组件：p h1 span，type是字符串
 * 自定义组件：类型是一个函数。类组件的原型上有一个属性isReactComponent={}
 * 
 * 组件的名称：
 * 自定义组件的名称必须大写字母开头
 * 自定义组件的返回值有且只能有一个根元素
 * 
 */