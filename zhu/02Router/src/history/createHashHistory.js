/**
 * 1. state的处理
 * 2. 历史栈的处理
 * @returns {history} history对象
 */

function createHashHistory() {
    let action;
    let listeners = []; 
    const historyStack = []; // 历史栈
    let historyIndex = -1; // 当前的索引
    let state = {}; // 当前的状态
    function listen(listener) {
        listeners.push(listener);
        return ()=>{
            let idx = listeners.indexOf(listener);// 查找listener在数组中的索引
            listeners.splice(idx,1); // 删除数组中的idx位置的元素
        }
    }
    // 监听hash值的变化，如果hash值变化了，就执行回调函数
    window.addEventListener('hashchange',()=>{
        let pathname = window.location.hash.slice(1);// 获取hash值，去掉#号 /user
        Object.assign(history,{action, location: {pathname, state}});// 把新的action和pathname赋给history.action history.location
        if(!action || action === 'PUSH'){ // 如果action为空，就是第一次进来，或者是push操作
            historyStack[++historyIndex] = history.location;// 把新的location放到历史栈中
        }
        listeners.forEach(listener=>listener(history.location));// 循环数组，依次执行每个listener
    })
    function push(pathname, nextState){ // hash值修改
        action = 'PUSH';
        if(typeof pathname === 'object'){ // {pathname: '/user', state: {name: '我是Home'}
            state = pathname.state;
            pathname = pathname.pathname;
        }else{
            state = nextState;
        }
        window.location.hash = pathname; // 给hash赋值，赋值的时候不需要加#，因为hash本身就有#。
    }
    function go(n){
        action = 'POP'; // 当前动作是POP
        historyIndex += n; // 索引加n
        let nextLocation = historyStack[historyIndex];// 获取下一个location
        state = nextLocation.state;// 获取下一个location的state
        window.location.hash = nextLocation.pathname; // 给hash赋值
    }
    function goBack(){
        go(-1);
    }
    function goForward(){
        go(1);
    }
    const history = {
        action: 'POP', // 当前最后一个动作是什么push PUSH pop POP
        location: {pathname:'/',state:undefined}, // 如果当前hash有值，就取当前值，如果没有值，就取/
        go,
        goBack,
        goForward,
        push,
        listen,

    }
    action='PUSH';// action默认值是PUSH
    window.location.hash = window.location.hash?window.location.hash.slice(1): '/'; // 如果hash值为空，就给hash赋值为/
    return history;
}
export default createHashHistory