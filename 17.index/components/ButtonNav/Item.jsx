// import './index.less'

class NavItem extends React.Component {
    render() {
        const { index, item } = this.props;
        return (
            <div className={index ? 'item' : 'item active'}>{item}</div>
        )
    }
}

export default NavItem;