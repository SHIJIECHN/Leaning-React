let outerNumber = 0;
function Counter(){
    let number = 0;
    function effect(){
        // 因为这里的number始终为1，所以多次执行effect后，outerNumber也始终为number+1，也就是2
        outerNumber = number+1;
        console.log(number)
    }
    number++; // 这里的number是一个局部变量，每次执行effect后，number都会被销毁，所以每次执行effect后，outerNumber都会被重新赋值
    return effect;
}

let effect = Counter(); // 每次渲染Counter都会创建一个独立的闭包，它返回effect函数
effect();
effect();
effect();
effect();
console.log(outerNumber);// 2

/**
 Counter执行多次

 GO：{
    outerNumber: 0,
    effect: fn effect
 }

AO: {
    number: 0,
    effect: fn effect
}


 */