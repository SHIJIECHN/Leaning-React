class App extends React.Component {
    constructor() {
        super();
        // 初始化数据
        this.state = {
            count: 0
        }
    }

    // 增加
    increment = () => {
        // 将字符串的num变成number类型
        const num = this.select.value * 1;
        const { count } = this.state;
        this.setState({
            count: count + num
        })
    }
    // 减少
    decrement = () => {
        const num = this.select.value * 1;
        const { count } = this.state;
        this.setState({
            count: count - num
        })
    }

    incrementOffOdd = () => {
        const num = this.select.value * 1;
        const { count } = this.state;
        // count为奇数，只有当count是奇数是才能操作
        if (count % 2 === 1) {
            this.setState({
                count: count + num
            })
        }
    }

    incrementDelay = () => {
        const num = this.select.value * 1;
        const { count } = this.state;

        setTimeout(() => {
            this.setState({
                count: count + num
            })
        }, 1000)
    }


    render() {
        const { count } = this.state;
        return (
            <div>
                <h1> 数值： {count} </h1>
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

ReactDOM.render(
    <App />,
    document.getElementById('app')
)