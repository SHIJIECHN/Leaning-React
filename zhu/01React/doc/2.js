let isBatchingUpdate = false;

let queue = [];
let state = { number: 0 }
function setState(newState) {
  if (isBatchingUpdate) { // 是批量，异步更新
    queue.push(newState)
  } else { // 不是批量，同步更新
    state = { ...state, ...newState }
  }
}

function handleClick() {
  isBatchingUpdate = true; // 为true 变成批量的

  /** 这是我们自己的逻辑 开始 */
  setState({ number: state.number + 1 });
  console.log(state); // { number: 0 }
  setState({ number: state.number + 1 });
  console.log(state); // { number: 0 }
  /** 这是我们自己的逻辑 结束 */

  state = queue.reduce((newState, action) => { // 队列清空
    // return action(newState)
    return { ...newState, ...action }
  }, state)
}

handleClick();
console.log(state); // { number: 1 }