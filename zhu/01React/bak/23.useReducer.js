
import React from './react';
import ReactDOM from './react-dom';

function Child({data, handleClick}){
  console.log('Child render');
  return <button onClick={handleClick}>{data.number}</button>
}

let MemoChild = React.memo(Child); 
function App(){
  console.log('App render');
  const [name, setName] = React.useState('zhufeng');
  const [number, setNumber] = React.useState(0);

  const data = React.useMemo(()=>({number}), [number]); // 依赖number，只有number变化，data才会变化
  const handleClick = React.useCallback(()=>setNumber(number+1), [number]); // 依赖number，只有number变化，handleClick才会变化
  return(
    <div>
      <input type='text' value={name} onChange={event=> setName(event.target.value)}/>
      <MemoChild data={data} handleClick={handleClick}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
