import { increment, decrement } from '../action/index.jsx'


class App extends React.Component {
    // 增加
    increment = () => {
        // 将字符串的num变成number类型
        const num = this.select.value * 1;
        this.props.store.dispatch(increment(num));
    }
    // 减少
    decrement = () => {
        const num = this.select.value * 1;
        this.props.store.dispatch(decrement(num));
    }

    incrementOffOdd = () => {
        const num = this.select.value * 1;
        const state = this.props.store.getState();
        // count为奇数，只有当count是奇数是才能操作
        if (state % 2 === 1) {
            this.props.store.dispatch(increment(num))
        }
    }

    incrementDelay = () => {
        const num = this.select.value * 1;
        setTimeout(() => {
            this.props.store.dispatch(increment(num));
        }, 1000)
    }

    render() {
        // 获取store的值
        const state = this.props.store.getState();
        return (
            <div>
                <h1> 数值： {state} </h1>
                {/* 定义select */}
                <select ref={select => this.select = select}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button> &nbsp;
                <button onClick={this.decrement}>-</button> &nbsp;
                <button onClick={this.incrementOffOdd}>incrementOffOdd</button> &nbsp;
                <button onClick={this.incrementDelay}>incrementDelay</button>
            </div>
        )
    }
}

export default App;