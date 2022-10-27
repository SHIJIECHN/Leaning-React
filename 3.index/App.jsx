import Child from "./Child.jsx";

const fakeAccouts = [
  {
    id: 0,
    name: 'One',
    email: 'fake.email@example.com'
  },
  {
    id: 1,
    name: 'two',
    email: 'fake.email@example.com'
  }
]

class App extends React.Component {
  state = {
    filterText: ''
  }

  static getDerivedStateFromProps(props, state) {

    if (props.list !== state.prevPropsList ||
      state.prevFilterText !== state.filterText
    ) {
      return {
        prevPropsList: props.list,
        prevFilterText: state.filterText,
        filteredList: props.list.filter(item => item.text.include(state.filterText))
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      filterText: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <ul>
          {
            this.state.filteredList.map(item => (
              <li key={item.id}>{item.text}</li>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}


class Example extends React.Component {
  state = {
    filterText: ''
  }

  filter = memoize(
    (list, filterText) => list.filter(item => item.text.includes(filterText))
  )

  handleChange = (e) => {
    this.setState({
      filterText: e.target.value
    })
  }

  render() {
    const filteredList = this.filter(this.props.list, this.state.filterText)
    return (
      <Fragment>
        <input
          onChange={this.handleChange}
          value={this.state.filterText}
        />
        <ul>
          {
            filterText.map(item => (
              <li key={item.id}></li>
            ))
          }
        </ul>
      </Fragment>
    )
  }
}






ReactDOM.render(
  <App accounts={fakeAccouts} />,
  document.getElementById('app')
)



