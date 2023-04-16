
import React from './react';
import ReactDOM from './react-dom';

function SubCounter(props){
  console.log('SubCounter render');
  return <div>{props.count}</div>
}
// React.memo里面可以入一个比较函数，可以自定义比较规则。如果不传，就是浅比较。
// 如果返回true，就不更新，如果返回false，就更新
// let MemoSubCounter = React.memo(SubCounter, (prevProps, nextProps)=>{
//   return JSON.stringify(prevProps) === JSON.stringify(nextProps); // 深比较
// });

let MemoSubCounter = React.memo(SubCounter);
console.log(MemoSubCounter);// {$$typeof: Symbol(react.memo), compare: null, type: ƒ SubCounter(props)}

class Counter extends React.Component{
  state = {number: 0};
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
        <MemoSubCounter count={this.state.number}/>
      </div>
    )
  }
}
ReactDOM.render(<Counter />, document.getElementById('root'));