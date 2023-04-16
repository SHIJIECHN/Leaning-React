import React from './react';
import ReactDOM from './react-dom';
// import ThemeContext from './ThemeContext.js'
let ThemeContext = React.createContext();
console.log(ThemeContext);
let { Provider, Consumer } = ThemeContext;
// ThemeContext对象{ Provider, Consumer} Consumer一般用在函数组件中，类组件一般用contextType
function Header() {
  return (
    <Consumer>
      {
        value => (
          <div style={{
            margin: '10px',
            border: `5px solid ${value.color}`,
            padding: '5px',
          }}>
            头部
            <Title />
          </div>
        )
      }
    </Consumer>
  )
}
function Title() {
  return (
    <Consumer>
      {
        value => (
          <div style={{
            margin: '10px',
            border: `5px solid ${value.color}`,
            padding: '5px',
          }}>
            标题
          </div>
        )
      }
    </Consumer>
  )
}
class Main extends React.Component {
  static contextType = ThemeContext; // 给静态属性contextType赋值，可以使用this.context取得值
  render() {
    return (
      <div style={{
        margin: '10px',
        border: `5px solid ${this.context.color}`,
        padding: '5px',
      }}>
        主体
        <Content />
      </div>
    )
  }
}

class Content extends React.Component {
  static contextType = ThemeContext; // 给静态属性contextType赋值，可以使用this.context取得值
  render() {
    return (
      <div style={{
        margin: '10px',
        border: `5px solid ${this.context.color}`,
        padding: '5px',
      }}>
        内容
        <button onClick={() => this.context.changeColor('red')}>变红</button>
        <button onClick={() => this.context.changeColor('green')}>变绿</button>
      </div>
    )
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'red' }
  }
  changeColor = (color) => {
    this.setState({ color })
  }
  render() {
    let contextValue = { color: this.state.color, changeColor: this.changeColor }
    return (
      <Provider value={contextValue}>
        <div style={{
          margin: '10px',
          border: `5px solid ${this.state.color}`,
          padding: '5px',
          width: '200px'
        }}>
          主页
          <Header />
          <Main />
        </div>
      </Provider>
    )
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));
