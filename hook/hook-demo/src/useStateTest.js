import { useState, Component } from 'react'
// window.arr = []
// function App() {
//   const [count, setCount] = useState(0);

//   console.log('render');
//   // window.arr.push(setCount);

//   const handleClick = () => {
//     // count 是外部传入的
//     // setCount(count + 1);
//     // setCount(count + 1);

//     // count参数是react传入的.
//     setCount(count => count + 1)
//     setCount(count => {
//       console.log(count); // 此时的count是上一个setCount后的值
//       return count + 1
//     });

//     console.log('handleClick: ' + count)
//   }

//   console.log(count);

//   return (
//     <div className="App">
//       <h1>You Clicked {count} times.</h1>
//       <button onClick={handleClick}>Click</button>
//     </div>
//   );
// }

/**
 * hook调用和UI对应起来，运行同一个钩子useState，返回不同的结果
 * 
 * 每次渲染组件的时候，都会有一个记忆单元格（实际上就是数组，状态数组）
 * 
 * 注意点：
 * 1. 第二个参数setCount引用是一致的
 * 2. Object.is的方式比较
 * 3. 函数更新（上一次的state，更新的最新的state） 和不同的返回值更新
 *  
 * count的返回值。
 * 
 * 4. 渲染时，多次setCount是会合并的
 * count返回次数
 * 
 * 5. 类组件state合并，函数组件中state不会合并对象
 * 6. 强制刷新 l类组件：this.setState||this.forceUpdate() shouldComponentUpdate
 *  函数组件 const [, setCount] = useState({})  => setState({})
 * 
 * 7. 所有hook不能在if switch for中使用
 * 8. 只能在函数组件中使用 hook
 * 9. 所有hook必须写在最开始的位置
 */

// 定义全局变量arr
// window.arr = []
// function App() {
//   const [count, setCount] = useState(0);
//   console.log('render');
//   window.arr.push(setCount)
//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

function App() {
  const [counter, setCounter] = useState(0);
  console.log('render');

  console.log(counter);
  return (
    <div>
      {/* 点击一次按钮，新增count1属性，counter.count没有了 */}
      <button onClick={() => setCounter({ count1: 2 })}>Btn1</button>
    </div>
  )
}
// class App extends Component {
//   state = {
//     count: 1
//   }

//   render() {
//     return (
//       // 点击按钮state对象会新增一个属性count1，state= {count: 1, count1: 2}
//       <button onClick={() => this.setState({ count1: 2 })}>Click</button>
//     )
//   }
// }

export default App;
