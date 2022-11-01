class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = {
      x: 0,
      y: 0
    }
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/* <p>当前的鼠标位置是({this.state.x}, {this.state.y})</p> */}
        {this.props.render(this.state)}
      </div>
    )
  }
}

class MouseTraker extends React.Component {
  render() {
    return (
      <>
        <h1>移动鼠标</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )} />
      </>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <MouseTraker />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)