import Header from './components/Header'
import ButtonNav from './components/ButtonNav'

class Main extends React.Component {
    state = {
        navData: [
            '第①',
            '第②',
            '第③',
            '第④',
        ]
    }
    render() {
        return (
            <>
                {/* Header ButtonNav页面组件 */}
                <Header>这是标题</Header>
                <div style={{ marginTop: 88 + 'px' }}>
                    <button onClick={() => this.props.themeChange('black')}>black</button>
                    <button onClick={() => this.props.themeChange('red')}>red</button>
                    <button onClick={() => this.props.themeChange('orange')}>orange</button>
                    <button onClick={() => this.props.themeChange('purple')}>purple</button>
                </div>

                <ButtonNav
                    data={this.state.navData}
                />
            </>
        )
    }
}

export default Main;