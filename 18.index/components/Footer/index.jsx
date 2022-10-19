import StButton from '../Button'
import { LoginStatusContext } from '../../context'

class Footer extends React.Component {
    render() {
        return (
            //StButton -> 自己封装的按钮组件
            <LoginStatusContext.Consumer>
                {
                    ({ status }) => (
                        <div className="footer">
                            <h1>footer</h1>
                            <StButton>footer({
                                status ? '已登录' : '未登录'
                            })</StButton>
                        </div>
                    )
                }

            </LoginStatusContext.Consumer>

        )
    }
}

export default Footer