/**
 * React.createContext()
 * 创建一个指定的Context对象
 * 组件会找里自己最近的Provider，获取其value
 * 如果没有匹配到Provider就使用的default value，
 * 其他情况均不使用默认参数，包括undefined和null，
 * 但是必须要写value={}
 * 
 * Context.Provider
 * 通过React.createContext创建的组件上下文对象里的一个组件
 * Provider组件可以插入其他组件，目的是订阅这个Context
 * 通过Provider的value属性来将数据传递给Consumer组件

 * value变化，插入Provider属性来将数据传递给Consumer组件
 * new an old value对比使用的算法是与Object.is相同的算法
 */
const AContext = React.createContext('default a');
const BContext = React.createContext('default b')
AContext.displayName = 'MyAContext';
// 针对devtool 的设置 给Provider提供具体的名称方便调试

class App extends React.Component {
    state = {
        a: 'a context',
        b: 'b context'
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                a: 'aa context',
                b: 'bb context'
            })
        }, 1000)
    }
    render() {
        return (
            <BContext.Provider value={this.state.b}>
                <AContext.Provider value={this.state.a}>
                    <Test />
                </AContext.Provider>
            </BContext.Provider>
        )
    }
}
class Test extends React.Component {
    // shouldComponentUpdate() {
    //     console.log('Will repain!!');
    //     return false;
    // }
    render() {
        return (
            /**
             * Consumer 使用Provider提供的value
             * 也就是订阅context的变更
             * Consumer内部使用一个函数作为子元素，有一个专题function as a child专门讲
             * 函数接收context最近的Provider提供的value
             * 没有Provider就会找default value
             */
            <BContext.Consumer>
                {
                    (valueB) => (
                        <AContext.Consumer>
                            {
                                (valueA) => (
                                    <div>{valueA + '.' + valueB}</div>
                                    // a context.b context
                                )

                            }
                        </AContext.Consumer>
                    )
                }
            </BContext.Consumer>
        )
    }
}
export default App;