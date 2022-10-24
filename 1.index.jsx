import PropTypes from 'prop-types'
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
}

Greeting.PropTypes = {
  name: PropTypes.string,
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optinalNode: PropTypes.node,
  optionalElement: PropTypes.element,
  optionalElementType: PropTypes.elementType
}
class App extends React.Component {
  render() {
    return (
      <div>
        <Title title="This is a title" />
      </div>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('app')
)
