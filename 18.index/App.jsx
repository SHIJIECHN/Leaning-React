import { btnStyle } from './config/index.js'
import Home from './views/Home.jsx'
import { BtnStyleContext, LoginStatusContext } from './context'

class App extends React.Component {
    state = {
        style: btnStyle.success,
        loginStatus: false
    }
    doClick(e) {
        console.log(e.target.textContent)
    }
    login() {
        this.setState({
            loginStatus: !this.state.loginStatus
        })
    }
    render() {
        return (
            //希望Home组件下所有的按钮通过style定义的样式去改变样式
            //希望点击时执行doClick
            <div className="app">
                <BtnStyleContext.Provider value={{
                    style: this.state.style,
                    doClick: this.doClick
                }}>
                    <LoginStatusContext.Provider value={{
                        status: this.state.loginStatus,
                        login: this.login.bind(this)
                    }}>
                        <Home></Home>
                    </LoginStatusContext.Provider>

                </BtnStyleContext.Provider>

            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)