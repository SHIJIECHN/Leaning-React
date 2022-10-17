import './index.less'
import { ThemeContext } from '../../context.js'

/* 头部标题栏。组件组合，this.props.children访问Header组件中间的内容 */
class Header extends React.Component {
    render() {
        return (
            <ThemeContext.Consumer>
                {
                    (theme) => <header className={`header ${theme}`}>{this.props.children}</header>

                }
            </ThemeContext.Consumer>

        )
    }
}

export default Header;