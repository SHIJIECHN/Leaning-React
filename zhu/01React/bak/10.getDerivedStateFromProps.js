import React from './react';
import ReactDOM from './react-dom';
class ChildCounter extends React.Component {
  state = { count: 0 }
  static defaultProps = {
    name: 'ChildCounter'
  }
  componentWillMount() {
    console.log('ChildCounter 1.componentWillMount')
  }
  // getDerivedStateFromProps为了取代componentWillReceivedProps
  // 因为以前很多人在使用componentWillReceivedProps会调用this.setState引起死循环
  static getDerivedStateFromProps(nextProps, prevState) {
    const { count } = nextProps;
    // return null; // 返回null不修改状态
    return { ...prevState, count: count * 2 }; // 新的状态对象
  }
  render() {
    console.log('ChildCounter 2.render')
    return <div>count:{this.state.count}</div>
  }
  componentDidMount() {
    console.log('ChildCounter 3.componentDidMount')
  }

  componentWillUnmount() {
    console.log('ChildCounter 6.componentWillUnmount');
  }
}

class Counter extends React.Component {
  static defaultProps = { // 1. 设置默认属性
    name: 'Counter'
  }
  constructor(props) {
    super(props);
    this.state = { // 2. 设置默认状态
      number: 0
    }
    console.log('Counter 1.constructor')
  }
  componentWillMount() {
    console.log('Counter 2.componentWillMount')
  }
  handleClick = (event) => {
    this.setState({ number: this.state.number + 1 })
  }
  componentWillUpdate() {
    console.log('Counter 6.componentWillUpdate');
  }
  componentDidUpdate() {
    console.log('Counter 7.componentDidUpdate');
  }
  componentDidMount() {
    console.log('Counter 4.componentDidMount')
  }
  render() {
    console.log('Counter 3.render')
    return (
      <div id={`Counter`}>
        <p>{this.props.name}:{this.state.number}</p>
        {this.state.number === 4 ? null : <ChildCounter count={this.state.number} />}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));