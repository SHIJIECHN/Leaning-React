function InputHoc(WrapperComponent) {
  // 为什么不建议修改WrapperComponent组件？

  // 重写参数参数组件componentDidUpdate方法
  // 这就会导致WrapperComponent里面的componentDidUpdate无法执行
  // 通过这种方式相当于覆盖了参数组件里面的方法
  // WrapperComponent.prototype.componentDidUpdate = function () {
  //   console.log('我是InputHoc');
  // }

  // 高阶组件不能修改参数组件
  // 因为这样修改可能会导致参数组件内部的逻辑的执行失效
  // 一切的功能都可以在容器组件内实现
  class InputHocComponent extends React.Component {
    state = {
      inputValue: ''
    }

    // 可以直接在InputHocComponent里面写
    componentDidUpdate() {
      console.log('我是InputHoc')
    }

    valueInput(e) {
      this.setState({
        inputValue: e.target.value
      })
    }

    render() {
      // 如何排除参数组件不需要的属性？
      // 用剩余参数的方式将a排除，然后将剩余的props传递给WrapperComponent
      const { a, ...props } = this.props;

      return (
        <WrapperComponent
          inputValue={this.state.inputValue}
          valueInput={this.valueInput.bind(this)}
          {...props}
        />
      )
    }
  }
  // 可以自定义组件名称
  InputHocComponent.displayName = 'InputHoc';
  return InputHocComponent;
}

export default InputHoc;