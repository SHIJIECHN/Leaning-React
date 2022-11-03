import './index.scss'

function Modal(props) {
  /**
   * 子组件CheckModal/EditModal传递过来的填充插槽位置
   * 外界决定是否显示modal组件：isShowModal
   * 外界传入标题：modalTitle
   * 外界传入的内容：children
   */
  const { isShowModal, modalTitle, children } = props;
  return (
    <>
      {
        isShowModal && (
          <div className='modal'>
            <div className='inner'>
              <div className='m-header'>{modalTitle}</div>
              <div className='content-wrapper'>{children}</div>
            </div>
          </div>
        )
      }
    </>

  )
}

export default Modal;