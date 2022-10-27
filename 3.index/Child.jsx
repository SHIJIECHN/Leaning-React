class Child extends React.Component {
  constructor(props) {
    console.log('子 constructor')
    super(props)
  }
  componentDidMount() {
    console.log('子 componentDidMount');
  }

  componentDidUpdate() {
    console.log('子 componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('子 componentWillUnmount');
  }

  render() {
    console.log('子 render')
    return (
      <div>
        <h1>子组件：{this.props.count}</h1>
      </div>
    )
  }
}

export default Child;