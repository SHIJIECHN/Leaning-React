const history = {
    listeners: [],
    listen(listener){
        history.listeners.push(listener);
        // 返回一个函数，新的函数就是把当前的listener从listeners中移除
        return ()=>{
            history.listeners = history.listeners.filter(item=> item!==listener);
        }
    }
}

let unlisten1 = history.listen(()=>console.log('listen1'));
let unlisten2 = history.listen(()=>console.log('listen2'));
unlisten2();
console.log(history.listeners.length); // 1