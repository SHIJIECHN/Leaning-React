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
                <Header>这是标题</Header>
                <ButtonNav
                    data={this.state.navData}
                />
            </>
        )
    }
}

export default Main;