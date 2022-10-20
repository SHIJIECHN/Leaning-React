

// class MyInput extends React.Component {
//   // 相当于定义在MyInput.prototype.componentDidUpdate的原型方法
//   componentDidUpdate() {
//     console.log("我是MyInput")
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.props.inputValue}</h1>
//         <p>总计： {this.props.b + this.props.c}</p>
//         <input
//           type="text"
//           placeholder="请填写"
//           value={this.props.inputValue}
//           onChange={this.props.valueInput}
//         />
//       </div>
//     )
//   }
// }


// 高阶组件接受的组件参数可以是类组件也可以是函数组件
// 只要高阶组件最终返回的的JSX或者react元素就可以了
function MyInput(props) {
  // 实现每次inputValue发生改变，函数都会执行
  React.useEffect(() => {
    console.log('我是MyInput')
  }, [props.inputValue])

  return (
    <div>
      <h1>{props.inputValue}</h1>
      <p>总计： {props.b + props.c}</p>
      <input
        type="text"
        placeholder="请填写"
        value={props.inputValue}
        onChange={props.valueInput}
      />
    </div>
  )
}

export default MyInput;