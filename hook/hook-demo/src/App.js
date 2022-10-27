import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  console.log(useState(1)); // [1, f] 一个数值1 和函数f


  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  );
}

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.state.count}</h1>
//         <button onClick={() => this.setState({ count: this.state.count + 1 })}>Click</button>
//       </div>
//     )
//   }
// }

export default App;
