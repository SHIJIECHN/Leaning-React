// lazy内置方法 / Suspense React内置组件，挂载React

/**
 * lazy是React提供给你的懒（动态）加载组件的方法 React.lazy()
 *  参数：是一个函数，接收动态导入组件 import() （必须支持Promise）
 *  好处：减少打包体积（方法：不是一次性打到bundle中，单独打一个，该加载的时候再加载进去。）对初次渲染不适用的组件延迟加载（异步获取），依赖内置组件Suspense，给lazy加上loading指示器组件的一个容器组件
 *    与import动态加载是两个完全不同的过程，import需要有触发再去加载，lazy是异步延迟加载，在加载的过程中有一个loading的效果，等数据返回后再去加载，因此需要Suspense
 */

import Loading from "./14.loading.jsx";
/**
 * lazy接收一个动态导入组件的函数
 * 该函数返回一个Promise。IE11以下需要使用polyfill
 * Promise会resolve一个默认导出的React组件 export default xxx
 * 
 * Suspense目前只和lazy配合实现组件等待加载指示器的功能
 * 
 * 服务端渲染不支持，只能使用Loadable Components（https://github.com/gregberge/loadable-components）
 * cd
 */

// 导入组件Main
const MainComponent = React.lazy(() => import('./14.main.jsx'));
const Main2Component = React.lazy(() => import('./14.main2.jsx'));

class App extends React.Component {
  render() {
    return (
      // <React.Suspense fallback={<div>Loading...</div>}>
      <React.Suspense fallback={<Loading />}>
        <div>
          {/* 可以嵌入多个组件 */}
          <MainComponent />
          <Main2Component />
        </div>
      </React.Suspense>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)