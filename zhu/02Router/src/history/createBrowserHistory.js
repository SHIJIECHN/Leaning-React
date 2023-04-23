function createBrowserHistory(){
    const globalHistory = window.history; // 获取浏览器的history对象
    // 兼容性写法
    
    const listeners = [];
    let action;
    let state;
    function go(n){
        globalHistory.go(n);
    }
    function goBack(){
        go(-1);
    }
    function goForward(){
        go(1);
    }

    function listen(listener){
        listeners.push(listener);
        return ()=>{
            let idx = listeners.indexOf(listener);
            listeners.splice(idx,1);
        }
    }

    // 主要是为了更新history对象中的action和location，更新页面
    function notify(newState){
        Object.assign(history,newState); // 覆盖history对象中的action和location
        listeners.forEach(listener=>listener(history.location));
    }

    function push(pathname, nextState){
        action ='PUSH';
        if(typeof pathname === 'object'){
            state = pathname.state;
            pathname = pathname.pathname;
        }else{
            state = nextState;
        }
        globalHistory.pushState(state,null, pathname); // 调用浏览器的pushState方法，改变state和pathname
        let location = {state, pathname};
        notify({action, location});
    }

    // // 当你调用pushState的时候，会执行这个回调函数，此功能浏览器是不支持的，需要我们自己处理
    // window.onpushstate = (event)=>{
    //     console.log(event)
    // }

    // 当你回退或前进的时候会执行，这个监听是浏览器自带的，默认支持
    //调用goBack方法的时候会回退，就触发onpopState，然后调用notify，更新history对象中的action和location
    window.onpopstate = (event)=>{
        console.log('onpopState', event);
        // 通知浏览器跳转，如果没有写写，url会改变，但是页面不会跳转
        // 点击回退按钮的时候，退到哪是在globalhistory里维护的，只能取回退之后最新的路径和状态
        notify({action:'POP', location:{pathname:window.location.pathname, state:globalHistory.state}})
    }

    const history = {
        action: 'POP', // 当前最后一个动作是什么push PUSH pop POP
        location: {pathname:window.location.pathname,state:globalHistory.state}, // 当前路径名和状态
        go,
        goBack,
        goForward,
        push,
        listen,
    }
    return history;

}
export default createBrowserHistory;