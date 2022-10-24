class Get extends React.Component {
  async componentDidMount() {
    const result = await axios(this.props.url);

    this.setState({
      data: result.data
    }, () => {
      setTimeout(() => {
        this.setState({
          component: this.props.children(this.state.data)
        })
      }, 1000)
    })
  }

  state = {
    data: [],
    component: this.props.loading
  }

  render() {
    return this.state.component;
  }
}

export default Get;