import React from './react';
import ReactDOM from './react-dom';

class ScrollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }
    this.wrapper = React.createRef();
    this.nIntervId = null;
  }

  addMessage = () => {
    this.setState((state) => ({
      messages: [`${state.messages.length}`, ...state.messages]
    }));
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.addMessage();
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.nIntervId);
  }
  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop, // 更新前向上卷去的高度
      prevScrollHeight: this.wrapper.current.scrollHeight // 更新前内容的高度
    }
  }
  componentDidUpdate(prevProps, prevState, { prevScrollTop, prevScrollHeight }) {
    // 更新前的高度 + 新增的内容高度
    this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
  }

  render() {
    let style = {
      height: '100px',
      wdth: '200px',
      border: '1px solid red',
      overflow: 'auto'
    }
    return (
      <div style={style} ref={this.wrapper}>
        {
          this.state.messages.map((message, index) => {
            return <div key={index}>{message}</div>
          })
        }
      </div>
    )
  }
}

ReactDOM.render(<ScrollList />, document.getElementById('root'));

