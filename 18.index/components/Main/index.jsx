import StButton from '../Button'
import { LoginStatusContext } from '../../context'

class Main extends React.Component {
    render() {
        return (
            //StButton -> 自己封装的按钮组件
            <LoginStatusContext.Consumer>
                {
                    ({ status }) => (
                        <div className="main">
                            <h1>main</h1>
                            <StButton>main({
                                status ? '已登录' : '未登录'
                            })</StButton>
                        </div>
                    )
                }

            </LoginStatusContext.Consumer>

        )
    }
}

export default Main