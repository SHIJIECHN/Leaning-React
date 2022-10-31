import App from './components/app.jsx'
import { createStore } from 'redux'
import { counter } from './reducers/index.jsx';
// import { increment, decrement } from './action/index.jsx';
// 创建store，接收一个renducer函数
const store = createStore(counter);

// 发送action给reducer
// store.dispatch({
//     type: 'INCREMENT',
//     data: 1
// })
// 优化action
// store.dispatch(decrement())
store.subscribe(render)

render();
function render() {
    ReactDOM.render(
        // 传入一个store对象，App中可以通过props获取store对象
        <App store={store} />,
        document.getElementById('app')
    )
}