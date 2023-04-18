
import React from './react';
import ReactDOM from './react-dom';

function useCounter(initialState){
  const [number, setNumber] = React.useState(initialState);
  const handleClick = ()=>{
    setNumber(number + 1);
  }
  return [number, handleClick];
}

function Counter2(){
  const [number, handleClick] = useCounter(10);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}

function Counter1(){
  const [number, handleClick] = useCounter(20);
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}

function App(){
  return (
    <div>
      <Counter1/>
      <Counter2/>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
