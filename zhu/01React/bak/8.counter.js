import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 类组件的数据来源有两个地方：父组件传过来的属性，自己内容的状态
 * 属性和状态发生变化后组件都会更新，属性都会渲染
 * 
 * 定义属性的方法有两个：一个是在构造函数中 
 */

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }; // 唯一可以给状态赋值的地方就是构造函数
  }
  // 组件挂载完成
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }
  // 组件将要卸载
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  // 类的属性，这样写法函数里的this永远指向组件的实例
  tick = () => {
    // 修改状态使用setState。setState可以修改状态，还可以让组件刷新
    this.setState({ date: new Date() })
  }
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <h2>现在时间是：{this.state.date.toLocaleString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('root'));

/**
 * 组件挂载完成，就执行计时器，每秒执行一次
 * 组件卸载时，将计时器清除
 */