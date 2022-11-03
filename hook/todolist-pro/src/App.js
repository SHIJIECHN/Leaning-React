import Test from "./components/Test/index.js";
import { useState, useCallback, useEffect } from 'react'
import './App.css'
import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from "./components/TodoItem";
import CheckModal from "./components/Modal/CheckModal/index.js";
import EditModal from "./components/Modal/EditModal/index.js";
import NoDataTip from "./components/NoDataTip/index.js";

function App() {
  const [isInputShow, setIsInputShow] = useState(false),
    [isShowCheckModal, setIsShowCheckModal] = useState(false),
    [isShowEditModal, setIsShowEditModal] = useState(false),
    [todoList, setTodoList] = useState([]),
    [currentData, setCurrentData] = useState({});

  /**
   * 功能：点击 ‘+’ 图标显示输入框
   */
  const showInputFn = () => {
    setIsInputShow(!isInputShow)
  }

  /**
   * 功能：新增输入框内容到待办事件列表中
   * useCallback钩子第二个参数数组依赖项一旦有变更时就会执行一次
   * 数组依赖项：缓存一个被缓存的元素
   * 该钩子避免组件随着父组件的更新而频繁更新
   * 缓存整个addItemFn函数，避免app组件render执行时生成新的函数传递给
   * 子组件，子组件发现新的函数数据变化重新执行render，重复更新
   */
  const addItemFn = useCallback((value) => {
    // 新增的数据字段item
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    // 将item concat到数组中
    setTodoList(todoList => [...todoList, dataItem]);
    // 隐藏输入框
    setIsInputShow(false)
    // 注意：这里的依赖项数组为什么不填写依赖项？
    // 因为上面setTodoList()参数里是一个回调函数todoList => [...todoList, dataItem]
    // 且该函数的参数todoList作为useCallback的依赖项，所以不用填写到数组里
  }, [])

  /**
   * 功能：点击某项复选框按钮触发，同步复选框的状态和事件完成中横线显示
   * 不依赖外部任何数据
   */
  const completedItem = useCallback((id) => {
    setTodoList((todoList) =>
      todoList.map(item => {
        if (item.id === id) {
          // 在严格模式下React.StrictMode，这里设置会失败，为什么？？
          item.completed = !item.completed
        }
        return item;
      })
    )
  }, [])

  // 功能：点击某项删除按钮 删除列表某一项待办事件
  const removeItem = useCallback((id) => {
    setTodoList((todolist) => todolist.filter((item) => item.id !== id))
  })

  const closeModal = () => {
    setIsShowCheckModal(false)
  }

  /**
   * 功能：点击某项查看按钮显示查看事件模态框
   * id：接收子组件传递过来的id
   * 缓存整个openCheckModal函数，避免app组件render执行时生成
   * 新的函数传递给子组件，导致子组件发现新的函数数据变化重新执行
   */
  const openCheckModal = useCallback((id) => {
    // 过滤data
    _setCurrentData(todoList, id);
    // 显示模态框
    setIsShowCheckModal(true);
    // 如果setCurrentData()里面的函数没有参数作为依赖项时，
    // 需要填写依赖项
  }, [todoList])

  /**
   * 功能：点击某项编辑按钮显示编辑模态框
   */
  const openEditModal = useCallback((id) => {
    _setCurrentData(todoList, id);
    // 显示编辑模态框
    setIsShowEditModal(true);
  }, [todoList]);

  /**
   * 功能：过滤某一项数据，更新到currentData中
   * todoList.filter(item => item.id === id)返回的是一个数组
   * 读取数据的第0位元素
   * @param {*} todoList 从todoList中过滤
   * @param {*} id 需要过滤的项id
   */
  function _setCurrentData(todoList, id) {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
  }

  /**
   * 功能：点击编辑事件模态框里面的确定按钮触发提交更改编辑表单内容
   * 参数1：修改后的数据对象
   * 参数2：原来的时间戳
   */
  const submitEdit = useCallback((newData, id) => {
    setTodoList((todoList) =>
      todoList.map((item) => {
        if (item.id === id) {
          item = newData
        }
        return item;
      })
    )
    // 关闭
    setIsShowEditModal(false);
  }, [])

  // 副作用----------------------------------------------

  // 功能： 从localStorage获取todoData数据


  useEffect(() => {
    // 从localStorage获取todoData数据
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]');
    // 用新的数据替换掉老的TodoList
    setTodoList(todoData);

    // 依赖项：依赖项发生变换，就会执行一次
  }, [])


  // 功能：将列表数据缓存到localStorage
  // 依赖项：每当todoList数据变更时才会执行useEffect程序
  useEffect(() => {
    // 保存todoList到localStorage中
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])

  return (
    <div className="App">
      {/* 查看、编辑模态框 */}
      <CheckModal
        isShowCheckModal={isShowCheckModal}
        closeModal={closeModal}
        data={currentData}
      />
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      />

      {/* 头部、新增输入框 */}
      <MyHeader openInput={showInputFn} />
      <AddInput
        isInputShow={isInputShow}
        addItem={addItemFn}
      />
      {/* 列表渲染，如果没有数据则渲染NoDataTip组件，有数据渲染ul */}
      {
        !todoList || todoList.length === 0
          ? (<NoDataTip />)
          :
          (
            <ul className="todo-list">
              {
                todoList.map((item, index) => {
                  return (
                    <TodoItem
                      data={item}
                      key={index}
                      openCheckModal={openCheckModal}
                      openEditModal={openEditModal}
                      completedItem={completedItem}
                      removeItem={removeItem}
                    />
                  )
                })
              }
            </ul>
          )
      }

    </div>
  );
}

export default App;
