import './index.scss'
import Modal from '../'
import { useRef } from 'react';
import { formatDateTime } from '../../../libs/utils.js'

function EditModal(props) {
  const { isShowEditModal, data, submitEdit } = props;
  const inputRef = useRef();
  const checkRef = useRef();

  // 格式化数据
  const formatNewData = () => {
    const val = inputRef.current.value.trim(),
      valLen = val.length;

    if (valLen === 0) {
      // 输入框为空，则填入原来的数据
      inputRef.current.value = data.content
    }

    // 新的item
    const newData = {
      id: new Date().getTime(),
      content: val,
      // 获取当前checked状态
      completed: checkRef.current.checked
    }
    // 提交数据(新的数据对象，原来的事件戳)
    submitEdit(newData, data.id);
  }

  return (
    <Modal
      isShowModal={isShowEditModal}
      modalTitle="编辑事件"
    >
      <p className="topic">时间：{formatDateTime(data.id)}</p>
      <p className="topic">
        <textarea
          ref={inputRef}
          defaultValue={data.content}
          className="text-area"
        />
      </p>

      <p className="topic">状态：
        <input
          type="checkbox"
          defaultChecked={data.completed ? true : false}
          ref={checkRef}
        />
      </p>

      <button
        className='btn btn-primary confirm-btn'
        onClick={formatNewData}
      >提交</button>
    </Modal>
  )
}

export default EditModal;