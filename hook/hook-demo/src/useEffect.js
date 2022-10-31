import { useState, useEffect } from "react";

/**
 * 副作用：和外部变量进行的交互
 * 
 * useEffect执行时机：
 * 1. 初次渲染执行 （didmount)
 * 2. 组件完成更新 （didUpdate）
 * 
 * 具体时间点是以页面DOM加载完成为准。
 * render执行构建React节点，由react节点构成虚拟DOM树，componentDidUpdate后
 * 才完成真实DOM。真实DOM的构建是在componentDidUpdate后
 * useEffect是在整个真实DOM构建完成后才会执行。
 * componentDidUpdate在真实DOM构建之前
 * 
 * 为什么是在真实DOM构建之后呢？
 * 因为useEffect里面是异步。
 * 
 * 
 * 为什么组件内部调用useEffect？
 * 
 * useEffect里面的函数是什么东西？
 * 闭包。
 * 闭包里拿到的count是什么呢？
 * 初次渲染是初始值。点击更新后拿到的是当前更新后的count
 * 
 * useEffect在每次渲染后都执行吗？是的。
 * 
 * 如果想要在渲染之前执行副作用，就要使用useLayoutEffect。
 * 
 */
// function App() {
//   const [count, setCount] = useState(0);

//   console.log('render'); // 初次渲染和更新的时候都会执行

//   useEffect(() => {
//     console.log('useEffect'); //
//   })

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

/**
 * componentDidMount：初次加载的时候通过ChatAPI获取friend的状态。订阅
 * componentWillUnmount：在组件移除的时候取消订阅
 */
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { isOnline: null };
//     this.handleStatusChange = this.handleStatusChange.bind(this);
//   }

//   componentDidMount() {

//     ChatAPI.subscribeToFriendStatus(
//       this.props.friend.id,
//       this.handleStatusChange
//     );
//   }
//   componentWillUnmount() {
//     ChatAPI.unsubscribeFromFriendStatus(
//       this.props.friend.id,
//       this.handleStatusChange
//     );
//   }
//   handleStatusChange(status) {
//     this.setState({
//       isOnline: status.isOnline
//     });
//   }

//   render() {
//     if (this.state.isOnline === null) {
//       return 'Loading...';
//     }
//     return this.state.isOnline ? 'Online' : 'Offline';
//   }
// }

/**
 * 如何移除timer？
 * 
 * 存在返回值的问题，useEffect返回的函数什么时候执行？
 * 首次执行不会执行console.log('clear Effect');,输出
 * render
 * useEffect
 * 
 * 点击Click:
 * render
 * clear Effect
 * useEffect
 * 
 * 先执行清理函数，再执行Effect。
 * 
 * 清理函数什么时候执行？每一次运行副作用函数之前运行。
 * 
 * 存在清理函数的时候：
 * 1. render + useEffect  
 * 2. render + clear Effect + useEffect
 */

// function App() {
//   const [count, setCount] = useState(0);
//   console.log('render')

//   useEffect(() => {
//     console.log('useEffect')
//     return () => {
//       console.log('clear Effect');
//     }
//   })

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

/**
 * 
 * 怎么清理timer的？
 * 
 * 每一次副作用函数都是不同的函数
 */

// function App() {
//   const [count, setCount] = useState(0);
//   console.log('render')

//   useEffect(() => {

//     let timer = setInterval(() => {
//       setCount(count + 1)
//     }, 1000)

//     console.log('useEffect')
//     return () => {
//       console.log('clear Effect');
//       clearInterval(timer); // 就是外面定义的timer，上一次的timer
//     }
//   })

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }


/**
 *  在组件销毁的时候清理函数会不会执行？组件销毁的时候清理函数会执行
 * 
 * 点击隐藏Foo，看Foo中的清理函数是否会执行。
 * 执行console.log('clear Effect');
 * 
 */
// const Foo = () => {
//   const [count, setCount] = useState(0);
//   console.log('render')

//   useEffect(() => {
//     console.log('useEffect')
//     return () => {
//       console.log('clear Effect');
//     }
//   })

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

// function App() {
//   const [visible, setVisible] = useState(true);
//   return (
//     <div>
//       {
//         visible && <Foo />
//       }
//       <button onClick={() => setVisible(!visible)}>显示/隐藏</button>
//     </div>
//   )
// }

/**
 * 每次都会清除一个计时器，再生成一个计时器。
 * 所以会有多个计时器，只想有一个计时器，
 * 希望只在初次渲染（didmount的时候）执行，不希望didUpdate的时候执行。
 * 
 * 添加依赖项： []
 * 
 * 此时计时器在执行，但是页面上的count一直显示1，不会增加。为什么？
 * 因为此时拿到的count一直是闭包的count。
 * 解决方式：
 * 第一种：可以使用异步的方式
 * setCount(count => count + 1) 此时count就是参数的count。
 * 输出结果为：
 * render
 * 开启计时器
 * 
 * 进入计时器
 * render
 * 
 * 进入计时器
 * render
 * ...
 * 
 * 
 * 第二种：修改为setCount(count + 1)并添加依赖项[count]
 * 控制台输出为：
 * render
 * 开启计时器
 * 
 * 进入计时器
 * render
 * 清除计时器
 * 开启计时器
 * 
 * 进入计时器
 * render
 * 清除计时器
 * 开启计时器
 * 
 * “进入计时器”以后，count增加，就会重新执行useEffect，“开启计时器”
 * 
 * 
 * 总结：
 * 1. 执行时机，什么时候执行
 * 2. 返回值，清除timer，timer是谁
 * 3. 上一次state和最新的state是什么，依赖项
 */

// function App() {
//   const [count, setCount] = useState(0);
//   console.log('render')

//   useEffect(() => {
//     console.log('开启计时器');

//     let timer = setInterval(() => {
//       console.log('进入计时器');
//       setCount(count + 1)
//     }, 1000)

//     return () => {
//       // 依赖项为空[]时，这里不会执行，因为useEffect只在didMount的时候执行
//       console.log('清除计时器');
//       clearInterval(timer)
//     }
//   }, [count])

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

/**
 * 第二个参数：依赖项。
 * 1. 指定当前副作用effect函数，所需要的依赖项。
 * 2. 依赖项是空数组，effect是在初次渲染和卸载的时候执行
 * 3. 有依赖项，依赖项不变，useEffect不会执行。只有当依赖项不一致的时候
 * 才会重新执行
 */


/**
 * 关注点分离：两个不相关的副作用写在一起。
 * 1. 拆分副作用
 * 
 * 只需要保证副作用的顺序，就会按顺序执行。
 * 
 * 2. 通过自定义Hook来实现的
 */



// function App() {
//   const [count, setCount] = useState(0);

//   // useEffect(() => {
//   //   // 第一个副作用
//   //   console.log('title')
//   //   // 第二个副作用
//   //   console.log('effect')
//   // })

//   // 拆分副作用
//   useEffect(() => {
//     // 第一个副作用
//     console.log('title: ' + count)
//   })
//   useEffect(() => {
//     // 第二个副作用
//     console.log('effect')
//   })

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Click</button>
//     </div>
//   )
// }

// 自定义Hook。只用来处理title effect
const useCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log('title: ' + count)
  })

  // 返回值
  return [count, setCount];
}

function App() {
  const [count, setCount] = useCount();
  useEffect(() => {
    console.log('effect')
  })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}


export default App;