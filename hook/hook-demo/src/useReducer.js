// state 比较的大 统一的方式来更改state（调度） dispatch
// 行为： action
/**
 * {
 *  type: increment,
 *  num: 0 
 * }
 */

import { useState } from "react";

// 统一调度管理
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      break;
  }
}

// 重写useReducer
function useReducer(reducer, initialCount) {
  const [count, setCount] = useState(initialCount);
  const dispatch = (action) => {
    let newCount = reducer(count, action);
    setCount(newCount);
  }

  return [count, dispatch]
}

function App() {
  // const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  )
}

export default App;