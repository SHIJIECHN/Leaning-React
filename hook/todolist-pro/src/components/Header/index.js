import './index.scss'

function Header(props){
  const {openInput} = props;
  return (
    <div className='header'>
      <h1>事件待办</h1>
      {/* 点击控制输入框展示 */}
      <span 
        className='icon'
        onClick={openInput}
      >&#43;</span>
    </div>
  )
}

export default Header;