import React from 'react';
import ReactDOM from 'react-dom';

/**
 * state的更新可能是异步的
 * 出于性能考虑React可能会把多个setState合并成同一个调用
 * 
 * 定义状态有两种方式：一种在构造函数里this.state={}，第二种在狗仔函数外面state={}
 */

class Counter extends React.Component {
  state = { number: 0 }

  /**
   * 在事件处理函数中，setState的调用会批量执行
   * 在事件处理函数，setState并不会修改this.state，等事件处理结束后再进行更新
   */
  handleClick = () => {
    // this.setState({ number: this.state.number + 1 });
    // console.log(this.state.number); // 0
    // this.setState({ number: this.state.number + 1 });
    // console.log(this.state.number); // 0

    // setState传入函数:state为老的状态。
    // this.setState((state) => ({ number: state.number + 1 }))
    // console.log(this.state.number); // 0
    // this.setState((state) => ({ number: state.number + 1 }));
    // console.log(this.state.number); // 0

    // 如果想要同步怎么办？setTimeout
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number); // 0
    this.setState({ number: this.state.number + 1 });
    console.log(this.state.number); // 0
    setTimeout(() => {
      // 在其他React不能管控的地方，就是同步执行的
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number); // 2
      this.setState({ number: this.state.number + 1 });
      console.log(this.state.number); // 3
    })

    // 如何判断它是同步还是异步，或者是不是批量？
    // 凡是React能管控的地方，都是批量的，异步的。事件处理函数、声明周期函数
    // 不能管控的地方就是同步的，非批量的。setInterval setTimeout 元素DOM事件
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));

/**
 * 组件挂载完成，就执行计时器，每秒执行一次
 * 组件卸载时，将计时器清除
 */