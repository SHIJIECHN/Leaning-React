import IndexPage from './pages/Index.jsx'
import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <div>
      {/* 容器。只要它能提供的东西，下面的组件都能收到 */}
      <Provider store={store}>
        <IndexPage />
      </Provider>
    </div>
  )
}

export default App
