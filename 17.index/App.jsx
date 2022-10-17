/**
 * 定制样式
 * 点击导航栏按钮切换显示页面
 * 点击按钮显示不同标题颜色背景
 * 点击按钮显示不同底部导航栏子项颜色
 */


import Main from "./Main.jsx"

import { ThemeContext } from './context.js'
/**
 * ThemeContext 
 * Provider 供应方
 * Consumer 消费方 使用方
 */

class App extends React.Component {

    state = {
        theme: 'black'
    }

    themeChange(theme) {
        this.setState({
            theme
        })
    }

    render() {
        return (
            // 通过Provider提供数据
            <ThemeContext.Provider value={this.state.theme}>
                {/* 页面组件 */}
                <Main themeChange={this.themeChange.bind(this)} />
            </ThemeContext.Provider>

        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)