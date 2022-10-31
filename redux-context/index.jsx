import propTypes from 'prop-types'

// class App extends React.Component {
//     // 在父组件中声明一个静态属性类型
//     static childContextTypes = {
//         color: propTypes.string,
//         num: propTypes.number
//     }

//     getChildContext() {
//         return {
//             color: 'red',
//             num: 2
//         }
//     }

//     render() {
//         const num = 1
//         return (
//             <div>
//                 <h1>React Context {num}</h1>
//                 <Main num={num} />
//             </div>
//         )
//     }
// }
// class Main extends React.Component {
//     render() {
//         return (
//             <div>
//                 <p>Main页面---{this.props.num}</p>
//                 <Title num={this.props.num} />
//             </div>
//         )
//     }
// }

// class Title extends React.Component {
//     static contextTypes = {
//         color: propTypes.string,
//     }
//     render() {
//         return (
//             <div>
//                 <p>{console.log(this)}</p>
//                 <p>Title的页面---{this.props.num}--{this.context.color}</p>
//             </div>
//         )
//     }
// }

/**
 * 当多层嵌套传递数据时，如何使子孙组件不使用逐层传递而获取到父组件数据
 */
// 第二种方式
const context = React.createContext();

class App extends React.Component {
    render() {
        const num = 1
        return (
            <div>
                <h1>React Context {num}</h1>
                <Main num={num} />
            </div>
        )
    }
}
class Main extends React.Component {
    render() {
        return (
            <div>
                <p>Main页面---{this.props.num}</p>
                <Title num={this.props.num} />
            </div>
        )
    }
}

class Title extends React.Component {

    render() {
        return (
            <context.Consumer>
                {
                    (context) => (
                        <div>
                            <p>{console.log(this)}</p>
                            <p>{console.log(context)}</p>
                            <p>Title的页面---{this.props.num}--{context.num}</p>
                        </div>

                    )
                }

            </context.Consumer>
        )
    }
}

ReactDOM.render(
    (
        <context.Provider
            value={{
                color: 'red',
                num: 2
            }}
        >
            <App />
        </context.Provider>
    ),
    document.getElementById('app')
)