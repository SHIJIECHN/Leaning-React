
import React from 'react';
import ReactDOM from 'react-dom';

function Counter(){
  const [number, setNumber] = React.useState(0);
  // React.useEffect接收一个函数，这个函数会在组件挂载或者更新后执行
  React.useEffect(()=>{
    console.log('开启一个新的定时器');
    const timer = setInterval(()=>{
      console.log('执行定时器');
      setNumber(number=>number+1);
      }, 1000)
    return()=>{
      console.log('清空定时器', number);
      clearInterval(timer);
    }
  },[number])
  return (
    <p>{number}</p>
  )
}

ReactDOM.render(<Counter />, document.getElementById('root'));
