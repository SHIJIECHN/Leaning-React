import StButton from '../Button'
import { LoginStatusContext } from '../../context'

class Header extends React.Component {
    render() {
        return (
            //StButton -> 自己封装的按钮组件
            <LoginStatusContext.Consumer>
                {
                    ({ status, login }) => (
                        <div className="header">
                            <h1>Header</h1>
                            <StButton>Header({
                                status ? '已登录' : '未登录'
                            })</StButton>
                            <button onClick={login}>登录/注销</button>
                        </div>
                    )
                }

            </LoginStatusContext.Consumer>

        )
    }
}

export default Header