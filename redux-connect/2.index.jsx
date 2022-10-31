import App from './components/app.jsx'
import { createStore } from 'redux'
import { counter } from './reducers/index.jsx';
// import { Provider } from 'react-redux'
const store = createStore(counter);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <App />
    </ReactRedux.Provider>
    ,
    document.getElementById('app')
)