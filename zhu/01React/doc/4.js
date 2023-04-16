let index = 0;
function state(){
    let currentIndex = index;
    function setstate(){
        console.log('currentIndex:', currentIndex);
    }
    index++;
    return setstate;
}

let fn1 = state()
let fn2 = state()
let fn3 = state()
fn1(); // currentIndex: 0
fn2(); // currentIndex: 1
fn3(); // currentIndex: 2