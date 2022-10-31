import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import courseTabListReducers from './reducers/courseTabList.js';
import courseTabListState from './states/courseTabList.js'

const allReducers = combineReducers({
    courseTabList: courseTabListReducers
})

const store = createStore(allReducers, {
    courseTabList: courseTabListState
}, applyMiddleware(ReduxThunk));

export default store;