import { useEffect } from "react";
import { useState, memo, useCallback, useMemo } from "react";

// const Foo = memo(props => {
//   console.log('Foo render');
//   return (
//     <div>{props.count}</div>
//   )

// })

// function App() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1>count: {count}</h1>
//       {/* count变换每次render都会重新执行 */}
//       <button onClick={() => {
//         setCount(count + 1)
//       }}>Add</button>
//        <Foo count={1}/>
//     </div >
//   )
// }

/**
 * 以前的写法，传入的属性不变，希望子组件不渲染
 * 类组件使用PureComponent。函数组件使用memo包装.
 * memo是函数组件优化组件的一种方式。
 */

// const Foo = memo(props => {
//   console.log('Foo render');
//   return (
//     <div>
//       <ul>{props.render()}</ul>
//     </div>
//   )
// })

// function App() {
//   const [range, setRange] = useState({ min: 0, max: 10000 });
//   const [count, setCount] = useState(0);

//   const render = useCallback(() => {
//     const list = [];
//     console.log('App render')
//     for (let i = 0; i < range.max; i++) {
//       list.push(<li key={i}>{i}</li>)
//     }
//     return list;
//   }, [range])

//   return (
//     <div>
//       <h1>count: {count}</h1>
//       {/* count变换每次render都会重新执行 */}
//       <button onClick={() => {
//         setCount(count + 1)
//       }}>Add</button>
//       <Foo render={render}></Foo>
//     </div >
//   )
// }

/**
 * 当count发生变化时，App函数都会重新执行，当前render函数就是新的引用。
 * 
 * 要求：render函数指向同一引用
 * 使用useCallback
 * 
 * usecallback 和 useMemo有什么关系？
 * useCallback固定的是一个函数，useMemo固定的是一个值。
 * 
 * 根据range是否发生变化，
 * 
 * useMemo与useCallback
 * 
 * useMemo与memo的关系：
 * memo在于组件的优化，如果是函数组件，不希望每次都刷新。
 * useMemo用来固定值，函数组件中不希望子组件渲染，就传给子组件一个固定的值。
 * 类组件就传一个固定值就可以了。
 * 
 * useCallback在函数组件中使用，在类组件中通过实例绑定箭头函数。
 */

// // 使用useMemo
const Foo = memo(props => {
  console.log('Foo render');
  return (
    <div>
      {/* 改为模板，而不是函数 */}
      <ul>{props.render}</ul>
    </div>
  )
})

function App() {
  const [range, setRange] = useState({ min: 0, max: 10000 });
  const [count, setCount] = useState(0);

  // 模板
  const render = useMemo(() => {
    const list = [];
    console.log('App render')
    for (let i = 0; i < range.max; i++) {
      list.push(<li key={i}>{i}</li>)
    }
    return list;
  }, [])

  return (
    <div>
      <h1>count: {count}</h1>
      {/* count变换每次render都会重新执行 */}
      <button onClick={() => {
        setCount(count + 1)
      }}>Add</button>

      {/* 修改range */}
      {/* <button onClick={() => {
        setRange({
          ...range,
          max: range.max + 1
        })
      }}>Add</button> */}
      <Foo render={render}></Foo>
    </div >
  )
}


export default App;


