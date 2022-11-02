import Test from "./components/Test/index.js";
import {useState, useCallback} from 'react'
import MyHeader from './components/Header'
import AddInput from './components/AddInput'

function App() {
  const [isInputShow, setIsInputShow] = useState(false),
        [todoList, setTodoList] = useState([]);

  // useCallback 
  const addItem = useCallback((value) =>{
    // 新增的数据
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      complete: false
    }
    setTodoList(todoList => [...todoList, dataItem]);
    setIsInputShow(false)
  }, [])

  return (
    <div className="App">
      <MyHeader openInput={() => setIsInputShow(!isInputShow)}/>
      <AddInput 
        isInputShow={isInputShow}
        addItem={addItem}
      />
    </div>
  );
}

export default App;
