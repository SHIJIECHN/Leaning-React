import './index.scss'

function Header(props) {
  // openInput 控制输入框显示
  const { openInput } = props;

  return (
    <div className='header'>
      <h1>事件待办</h1>

      {/* 加号，点击控制输入框展示 */}
      <span
        className='icon'
        onClick={openInput}
      >&#43;</span>
    </div>
  )
}

export default Header;