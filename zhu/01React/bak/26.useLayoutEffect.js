
import React from './react';
import ReactDOM from './react-dom';

const Animation = ()=>{
  const ref = React.useRef(); //{current: null}
  // 使用useEffect会有一个移动的过程，因为useEffect是在绘制之后执行的
  // React.useEffect(()=>{
  //   ref.current.style.WebkitTransform = 'translate(500px)'; // 给ref.current添加一个动画，位移500px
  //   ref.current.style.transition = 'all 500ms'; // 有个渐变动画 500ms完成
  // });
  // useLayoutEffect会在绘制之前执行，所以没有移动的过程
  React.useLayoutEffect(()=>{
    ref.current.style.WebkitTransform = 'translate(500px)'; // 给ref.current添加一个动画，位移500px
    ref.current.style.transition = 'all 500ms'; // 有个渐变动画 500ms完成
  });
  let style = {
    width: '100px',
    height: '100px',
    background: 'red'
  }
  return <div style={style} ref={ref}>内容</div>
}
ReactDOM.render(<Animation />, document.getElementById('root'));
