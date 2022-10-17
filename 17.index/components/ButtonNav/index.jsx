import NavItem from './Item.jsx'
import './index.less'

/**
 * 底部导航切换栏
 */
class ButtonNav extends React.Component {
    render() {

        return (

            <div className="botton-nav">
                {
                    this.props.data.map((item, index) => {
                        return (
                            <NavItem
                                item={item}
                                index={index}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default ButtonNav;