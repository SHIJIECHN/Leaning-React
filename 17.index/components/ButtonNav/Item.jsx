import './index.less'
import { ThemeContext } from '../../context.js'


class NavItem extends React.Component {
    render() {
        // 接收父组件传递的index item
        const { index, item } = this.props;

        return (
            <ThemeContext.Consumer>
                {
                    (theme) => <div className={index ? 'item' : `item active-${theme}`}>{item}</div>

                }
            </ThemeContext.Consumer>
        )

    }
}

export default NavItem;