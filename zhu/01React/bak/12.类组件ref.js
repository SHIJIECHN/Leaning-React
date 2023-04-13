import React from './react';
import ReactDOM from './react-dom';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  getInputFocus = () => {
    this.inputRef.current.focus()
  }
  render() {
    return (
      <input type="text" ref={this.inputRef} />
    )
  }
}

// 点击按钮，让input获得焦点
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  getFormFocus = () => {
    // this.textInputRef.current指向TextInput类组件的实例
    this.textInputRef.current.getInputFocus();
  }
  render() {
    return (
      <>
        <TextInput ref={this.textInputRef}></TextInput>
        <button onClick={this.getFormFocus}>获得焦点</button>
      </>
    )
  }
}


ReactDOM.render(<Form />, document.getElementById('root'));
