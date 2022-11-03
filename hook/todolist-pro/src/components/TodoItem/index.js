import './index.scss'

function TodoItem(props) {
  const {
    data,
    openCheckModal,
    openEditModal,
    completedItem,
    removeItem
  } = props;


  return (
    <li className='todo-item'>
      <div className='checkbox'>
        <input
          type="checkbox"
          checked={data.completed}
          onChange={() => completedItem(data.id)}
        />
      </div>
      <span
        className='content'
        style={{
          textDecoration: data.completed ? 'line-through' : 'none'
        }}
      >{data.content}</span>
      <div className='btn-group'>
        <button
          className='btn btn-primary'
          onClick={() => openCheckModal(data.id)}
        >查看</button>
        <button
          className='btn btn-warning'
          onClick={() => openEditModal(data.id)}
        >编辑</button>
        <button
          className='btn btn-danger'
          onClick={() => removeItem(data.id)}
        >删除</button>
      </div>
    </li>
  )
}

export default TodoItem;