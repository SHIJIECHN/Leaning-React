
import { updateQueue } from "./Component.js";
/**
 * 实现事件委托，把所有的事件都绑定到document上
 * @param {*} dom 
 * @param {*} eventType 类型 onclick
 * @param {*} handler 处理器
 */
export function addEvent(dom, eventType, handler) {
  // 原生DOM上的一个自定义属性store ={ onclick: handler}
  let store; // 这是一个对象，里面存放此dom上对应的事件处理函数
  if (dom.store) {
    store = dom.store;
  } else {
    dom.store = {};
    store = dom.store;
  }
  store[eventType] = handler; //store.onclick = handler
  if (!document[eventType]) { // 如果有很多个元素都绑定click事件，往document只挂一次
    document[eventType] = dispatchEvent
  }
}

// 合成事件处理器
function dispatchEvent(event) {
  let { target, type } = event; // target是事件源dom, type => click
  let eventType = `on${type}`; // onClick
  updateQueue.isBatchingUpdate = true; // 切换为批量更新模式
  let syntheticEvent = createSyntheticEvent(event); // 合成事件
  // 模拟事件冒泡的过程
  while (target) {
    let { store } = target;
    let handler = store && store[eventType];
    handler && handler.call(target, syntheticEvent);
    target = target.parentNode;
  }
  updateQueue.isBatchingUpdate = false;
  updateQueue.batchUpdate();

}

// 合成事件：基于原生的event，生成一个新的合成对象，
// 在源码里，此处做了一些浏览器兼容性的适配
function createSyntheticEvent(event) {
  let syntheticEvent = {};
  for (let key in event) {
    syntheticEvent[key] = event[key];//////////////
  }
  return syntheticEvent;
}


