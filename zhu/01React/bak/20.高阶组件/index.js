import React from './react';
import ReactDOM from './react-dom';

// 假设AntDesignButton是一个第三方组件库，我们想要在它的基础上添加一些功能，比如
// 1. 不渲染title，而渲染数字number。
// 2. 给button添加一个点击事件，点击后数字加1
class AntDesignButton extends React.Component{
  constructor(props){
    super(props);
    this.state = {name:'张三'}
  }
  conponentWillDidMount(){
    console.log('AntDesignButton conponentWillDidMount');
  }
  componentDidMount(){
    console.log('AntDesignButton componentDidMount');
  }
  render(){
    console.log('AntDesignButton render');
    return(
      <button name={this.state.name}>{this.props.title}</button>
    )
  }
}

const wrapper = OldComponent =>{ // 高阶组件
  // 返回值是一个新的组件继承自OldComponent
  return class extends OldComponent{
    constructor(props){
      super(props);
      console.log(this.state)
      // 如果想要拿到子类的state状态的话，可以使用this.state，此时this.state = {name:'张三'}然后再对this.state进行修改
      this.state = {...this.state, number: 0}
    }
    conponentWillDidMount(){
      console.log('wrapper componentWillMount');
      super.conponentWillDidMount(); // 调用原来的生命周期方法.如果没有这句，那么AntDesignButton的生命周期方法不会执行
    }
    componentDidMount(){
      console.log('wrapper componentDidMount');
      super.componentDidMount(); // 可以不写
    }
    handleClick = () =>{ // 代理了原来的点击事件
      this.setState({number: this.state.number + 1});
    }
    render(){
      console.log('wrapper render');
      let renderElement = super.render(); // 调用原来的render方法。renderElement是个虚拟DOM
      // 不可以直接修改renderElement，因为它是只读的
      // renderElement.props.children = this.state.number;
      // renderElement.props.onClick = this.handleClick;

      // 解决：renderElement克隆一个新的虚拟DOM
      let newProps = {
        ...renderElement.props,
        onClick:this.handleClick,
      }
      // cloneElement(要克隆的虚拟DOM，新的属性，新的子节点)
      let cloneElement = React.cloneElement(renderElement, newProps, this.state.number);
      return cloneElement;
    }
  }
}

let WrappedAntDesignButton = wrapper(AntDesignButton);

ReactDOM.render(<WrappedAntDesignButton title="这是一个按钮标题"/>, document.getElementById('root'));

