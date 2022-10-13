/**
 * 错误边界组件捕获错误的时机：
 *  渲染时、生命周期函数中、组件树的构造函数中
 * 
 * 如果多个嵌套错误边界组件，则从最里层错误出发，向上冒泡触发捕获
 */

/**
 * static getDerivedStateFromError(error)
 * 静态方法。是一个声明周期函数
 * 参数：子组件抛出的错误
 * 返回值就是新的state
 * 获取捕获错误，修改错误状态
 * 作用：渲染备用的UI
 * 渲染阶段调用，不允许出现副作用，不允许出现异步代码
 * 
 * 无法捕获的场景：
 *  1. 事件处理函数。没办法在渲染的时候直接捕获事件处理函数内部的错误，必须执行了才可以
 *  2. 异步代码。setTimeout、ajax
 *  3. 服务端渲染
 * 
 * componentDidCatch(error, info)。原型上的方法
 * 边界错误组件捕获异常，并进行后续处理
 * 作用：错误信息捕获，运行副作用
 * 在组件抛出错误后调用
 * 参数1：error 抛出的错误
 * 参数2：info 组件引发错误的相关信息，组件的栈
 */

class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true }
  }

  // 处理副作用
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        // <h1>This is Error UI1.</h1>
        <h1>{abc.title}</h1>
      )
    }
    return this.props.children;
  }
}

class ErrorBoundary2 extends React.Component {
  constructor(props) {
    super(props);
    // componentDidCatch有冒泡机制，会冒泡到window上面
    // window.onerror 可以监听到error触发的
    // 注意：生产环境下不可以
    window.onerror = function (err) {
      console.log(err);
    }
  }
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    console.log(error);
    return { hasError: true }
  }

  // 处理副作用
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>This is Error UI2.</h1>
      )
    }
    return this.props.children;
  }
}

class Test extends React.Component {
  render() {
    return (
      <div>{data.title}</div>
    )
  }
}

class Sub extends React.Component {
  constructor(props) {
    super(props);

    setTimeout(() => {
      throw new Error('This is a setTimeout Error.');
    }, 1000)
  }
  handleClick() {
    console.log(123);
    // throw new Error('This is a btnClick error!');
  }
  render() {
    return (
      <p onClick={this.handleClick.bind(this)}>This is content.</p>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <ErrorBoundary>
          <Sub />
        </ErrorBoundary>

        <ErrorBoundary2>
          <ErrorBoundary>
            <Test />
          </ErrorBoundary>
        </ErrorBoundary2>


      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)