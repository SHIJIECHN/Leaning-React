import './index.less'
import { ThemeContext } from '../../context.js'


class NavItem extends React.Component {
    render() {
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