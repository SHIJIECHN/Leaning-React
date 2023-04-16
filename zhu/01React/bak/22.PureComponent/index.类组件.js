
import React from './react';
import ReactDOM from './react-dom';

// 新状态和老状态如果是同一个对象，那么就不会更新
// PureComponent重写了shouldComponentUpdate方法，只有状态或者属性发生改变才会更新

class SubCounter extends React.PureComponent{
  render(){
    console.log('SubCounter render');
    return <div>{this.props.count}</div>
  }
}

class Counter extends React.PureComponent{
  state = { number: 0};
  inputRef = React.createRef();
  handleClick = (event)=>{
    // this.inputRef.current.value如果是数字，就转成数字，如果不是数字，就转成0
    let amount = isNaN(this.inputRef.current.value) ? 0 : parseInt(this.inputRef.current.value);
    this.setState({ number: this.state.number + amount })
  }
  render(){
    console.log('Counter render');
    return(
      <div>
        <p>{this.state.number}</p>
        <input ref={this.inputRef} type="text"/>
        <button onClick={this.handleClick}>+</button>
        <SubCounter count={this.state.number}/>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));
