import './index.scss'
import { useRef } from 'react'

function AddInput(props) {
  // 使用ref获取输入框
  const inputRef = useRef();
  // 是否显示组件
  const { isInputShow, addItem } = props;

  // 增加
  const submitValue = () => {
    // 获取输入框的值
    const inputValue = inputRef.current.value.trim();
    // 通过判断是否有值，输入框没有值则retrun
    if (inputValue.length === 0) {
      return;
    }
    // 增加item
    addItem(inputValue);
    // 清空输入框
    inputRef.current.value = '';
  }

  return (
    <>
      {
        isInputShow && (
          <div className="input-wrapper">
            <input
              type="text"
              ref={inputRef}
              placeholder="请输入待办事件"
            />
            {/* 提交增加操作 */}
            <button
              className="btn btn-primary"
              onClick={submitValue}
            >
              增加
            </button>
          </div>
        )
      }
    </>
  )
}

export default AddInput;