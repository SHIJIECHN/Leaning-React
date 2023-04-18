let index = 0;
function state(){
    let currentIndex = index;
    function setstate(){
        // currentIndex记录的是当前执行state函数时，全局变量index的值
        console.log('currentIndex:', currentIndex);
    }
    index++; // 全局变量，每次执行setstate都会改变它的值
    return setstate;
}

let fn1 = state()
let fn2 = state()
let fn3 = state()
fn1(); // currentIndex: 0
fn2(); // currentIndex: 1
fn3(); // currentIndex: 2