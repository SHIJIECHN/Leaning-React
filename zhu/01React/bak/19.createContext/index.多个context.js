import React from './react';
import ReactDOM from './react-dom';

const GrandFatherContext = React.createContext();
const FatherContext = React.createContext();

class Son extends React.Component {
  render() {
    return (
      <GrandFatherContext.Consumer>
        {
          grandFathValue => (
            <FatherContext.Consumer>
              {
                fatherValue => (
                  <div>
                    <p>name: {grandFathValue.name}</p>
                    <p>age: {fatherValue.age}</p>
                  </div>
                )
              }
            </FatherContext.Consumer>
          )
        }
      </GrandFatherContext.Consumer>
    )
  }
}

class Father extends React.Component {
  render() {
    let fatherValue = {age: 20 }
    return (
      <FatherContext.Provider value={fatherValue}>
        <div style={{ margin: '10px', border: `5px solid red`, padding: '5px', width: '200px' }}>
          <Son/>
        </div>
      </FatherContext.Provider>
    )
  }
}

class GrandFather extends React.Component {
  render() {
    let grandFathValue = {name: 'grandFather' }
    return (
      <GrandFatherContext.Provider value={grandFathValue}>
        <div style={{ margin: '10px', border: `5px solid red`, padding: '5px', width: '200px' }}>
          <Father/>
        </div>
      </GrandFatherContext.Provider>
    )
  }
}

ReactDOM.render(<GrandFather />, document.getElementById('root'));
