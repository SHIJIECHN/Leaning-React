import React from './react';
import ReactDOM from './react-dom';

function Child(props, ref){
  const childRef = React.useRef(); // current才是指向input元素的DOM对象
  // 函数组件自定义暴露给父组件ref对象
  React.useImperativeHandle(ref, ()=>({ // ref 指向useImperativeHandle的返回值，父组件使用ref使，只能调用focus方法，其他方法没有实现
    focus(){
      childRef.current.focus();
    }
  }));
  return <input ref={childRef}/>
}

let ForwardChild = React.forwardRef(Child)

function Parent(){
  const [number, setNumber] = React.useState(0);
  const inputRef = React.useRef();
  const getFocus = ()=>{
    inputRef.current.focus(); // 造成问题，不安全
  }
  return (
    <div>
      <ForwardChild ref={inputRef}/>
      <button onClick={getFocus}>焦点</button>
    </div>
  )
}
ReactDOM.render(<Parent />, document.getElementById('root'));