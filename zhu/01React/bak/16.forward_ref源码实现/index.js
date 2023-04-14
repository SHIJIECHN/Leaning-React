import React from './react';
import ReactDOM from './react-dom';

function TextInput(props, ref) {
  return (
    <input ref={ref} />
  )
}

const ForwardedTextInput = React.forwardRef(TextInput)
console.log(ForwardedTextInput);
/**
$$typeof :  Symbol(react.forward_ref)
render :  ƒ TextInput(props, ref)
 */
// 点击按钮，让input获得焦点
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
  }
  getFormFocus = () => {
    this.textInputRef.current.focus();
  }
  render() {
    return (
      <div>
        <ForwardedTextInput ref={this.textInputRef} />
        <button onClick={this.getFormFocus}>获得焦点</button>
      </div>
    )
  }
}


ReactDOM.render(<Form />, document.getElementById('root'));
