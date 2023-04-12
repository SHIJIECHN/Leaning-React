let queue = [];
queue.push((state) => ({ number: state.number + 1 }))
queue.push((state) => ({ number: state.number + 1 }))
let state = { number: 0 }
let result = queue.reduce((state, action) => {
  return action(state)
}, state);
console.log(result); // { number: 2 }