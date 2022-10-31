/**
 * 包含多个Reducer函数的模块
 * reducer接收两个参数：state、action
 * 返回一个新的state
 */

export function counter(state = 0, action) {
    console.log(action);// {data: 1, type: 'INCREMENT'}
    switch (action.type) {
        case 'INCREMENT':
            return state + action.data;
        case 'DECREMENT':
            return state - action.data;
        default:
            return state;
    }
}

