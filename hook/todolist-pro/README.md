## 案例：事件待办

**写法**

- 组件hooks写法
- 事件传递
- 属性传递

**组件划分：**
- Header标题组件
- 输入框组件
- 列表某一项组件
- 模态框组件
- 查看内容组件
- 编辑内容组件

**功能：**
- 事件待办列表渲染
- 点击加号显示输入框(useState)
- 输入内容新增待办事项(useCallback)
- 将列表数据缓存到localstorage （useEffect）
- 点击待办事项复选框同步事件中横线显示（useCallback)
- 点击查看按钮显示查看内容模态框（useCallback)
- 点击编辑按钮修改模态框显示的内容（useCallback)
- 点击删除按钮删除列表某一项待办事件（useCallback)
- 点击checkbox输入框改变待办项状态（useCallback)

**知识点**
- useState、useRef和useCallback的使用场景
- Modal模态框插槽的应用
- useEffect的使用
