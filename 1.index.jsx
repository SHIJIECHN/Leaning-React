// class DataTime extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   state = {
//     dateTime: new Date().toString()
//   }

//   componentDidMount() {
//     this.t = setInterval(() => {
//       this.setState({
//         dateTime: new Date().toString()
//       })
//     }, 1000)
//   }

//   componentWillUnmount() {
//     clearInterval(this.t);
//     this.t = null;
//     console.log('over');
//   }

//   render() {
//     return (
//       <div>{this.state.dateTime}</div>
//     )
//   }
// }

// class App extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>当前时间为：</p>
//         <DataTime />
//       </div>
//     )
//   }
// }

// setTimeout(() => {
//   ReactDOM.unmountComponentAtNode(
//     document.getElementById('app')
//   )
// }, 5000);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      val: 0
    };
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log('componentDidMount: ' + this.state.val);    // 0 第 1 次 log

    this.setState({ val: this.state.val + 1 });
    console.log('componentDidMount: ' + this.state.val);    // 0 第 2 次 log

    setTimeout(() => {
      console.log('setTimeout: ' + this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log('setTimeout: ' + this.state.val);  // 2 第 3 次 log

      this.setState({ val: this.state.val + 1 });
      console.log('setTimeout: ' + this.state.val);  // 3 第 4 次 log
    }, 0);
  }

  render() {
    console.log('render: ' + this.state.val)
    return null;
  }
};
ReactDOM.render(
  <App />,
  document.getElementById('app')
)
