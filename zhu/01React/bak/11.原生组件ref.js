import React from './react';
import ReactDOM from './react-dom';

class Sum extends React.Component {
  numberA;
  numberB;
  result;
  constructor(props) {
    super(props);
    this.numberA = React.createRef();// { current: null}
    this.numberB = React.createRef();
    this.result = React.createRef();
  }

  handleClick = (event) => {
    let numberA = this.numberA.current.value;
    let numberB = this.numberB.current.value;
    this.result.current.value = parseFloat(numberA) + parseFloat(numberB);
  }

  render() {
    return (
      <>
        <input ref={this.numberA} type="text" />
        <input ref={this.numberB} type="text" />
        <button onClick={this.handleClick}>+</button>
        <input ref={this.result} type="text" />
      </>
    )
  }
}

ReactDOM.render(<Sum />, document.getElementById('root'));
