
/**
 * 创建仓库的工厂方法，返回一个仓库，仓库就是一个JS对象，包含了应用的状态和一些方法
 * @param {*} reducer 根据老状态和动作计算下一个新状态
 */

export const createStore = (reducer)=>{
    let state; // 可以存放任意的内容
    let listeners = [];
    function getState(){
        return state;
    }
    function dispatch(action){
        state = reducer(state, action);
        listeners.forEach(listener=>listener());
    }
    function subscribe(listener){
        listeners.push(listener);
        return ()=>{
            // listeners = listeners.filter(item=>item!==listener); // 取消订阅listener
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
    }
    dispatch({type: '@@REDUX/INIT'})
    return {
        getState,
        dispatch,
        subscribe
    }
}