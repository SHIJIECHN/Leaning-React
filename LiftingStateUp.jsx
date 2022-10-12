// class Info extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>第{this.props.inputNum}号</p>
//         <p>输入长度：{this.props.username.length}</p>
//         <p>提示：{
//           this.props.username.length < 6 ?
//             '长度必须大于等于6位' :
//             (this.props.username.length >= 6 && (
//               this.props.username.length <= 12 ?
//                 '长度合法' :
//                 '长度必须小于12'
//             ))
//         }</p>
//       </div>
//     )
//   }
// }

function Info(props) {
  return (
    <div>
      <p>第{props.inputNum}号</p>
      <p>输入长度：{props.username.length}</p>
      <p>提示：{
        props.username.length < 6 ?
          '长度必须大于等于6位' :
          (props.username.length >= 6 && (
            props.username.length <= 12 ?
              '长度合法' :
              '长度必须小于12'
          ))
      }</p>
    </div>
  )
}

class UserNameInput extends React.Component {
  // state = {
  //   username: ''
  // }

  // changeUserName(e) {
  //   this.setState({
  //     username: e.target.value
  //   })
  // }

  render() {
    return (
      <div>
        <Info username={this.props.username} inputNum={this.props.inputNum} />
        <div>
          <input type="text" value={this.props.username} onChange={(e) => this.props.usernameChange(e)} />
        </div>
      </div>
    )
  }
}

// function UserNameInput(props) {
//   const [username, setUsername] = React.useState('');
//   const changeUserName = (e) => {
//     setUsername(e.target.value)
//   }
//   return (
//     <div>
//       <Info username={username} inputNum={props.inputNum} />
//       <div>
//         {/* <input type="text" onChange={(e) => changeUserName(e)} /> */}
//         <input type="text" onChange={(e) => setUsername(e.target.value)} />
//       </div>
//     </div>
//   )
// }

class App extends React.Component {
  state = {
    username: ''
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div>
        <UserNameInput
          inputNum={1}
          username={this.state.username}
          usernameChange={this.usernameChange.bind(this)}
        />
        <UserNameInput
          inputNum={2}
          username={this.state.username}
          usernameChange={this.usernameChange.bind(this)}
        />
      </div>
    )
  }
}

// function App() {
//   return (
//     <div>
//       <UserNameInput inputNum={1} />
//       <UserNameInput inputNum={2} />
//     </div>
//   )
// }

ReactDOM.render(
  <App />,
  document.getElementById('app')
)