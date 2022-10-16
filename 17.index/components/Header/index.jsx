import './index.less'
class Header extends React.Component {
    render() {
        return (
            <header className="header">{this.props.children}</header>
        )
    }
}

export default Header;