import Main from "./Main.jsx"

class App extends React.Component {
    render() {
        return (
            <Main />
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)