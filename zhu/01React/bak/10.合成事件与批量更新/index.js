import React from './react';
import ReactDOM from './react-dom';

class Counter extends React.Component {
  state = { number: 0 }

  handleClick = () => {
    // 回调是在更新之后执行的
    this.setState({ number: this.state.number + 1 });
    console.log('handleClick', this.state.number);
    this.setState({ number: this.state.number + 1 });
    console.log('handleClick', this.state.number);
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 });
      console.log('setTimeout', this.state.number);
      this.setState({ number: this.state.number + 1 });
      console.log('setTimeout', this.state.number);
    })
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
