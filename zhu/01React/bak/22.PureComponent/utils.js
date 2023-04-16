import { REACT_TEXT } from "./constant.js";
/**
 * 不管原来是什么样的元素，都转成对象的形式，方便后续的DOM-Diff
 * @param {*} elemnet 
 * @returns 
 */
export function wrapToVdom(element) {
  // 如果是字符串或数字，返回一个对象，也是一个React元素，也是虚拟DOM
  if (typeof element === 'string' || typeof element === 'number') {
    return { type: REACT_TEXT, props: { content: element } };// content就是文本内容
  } else {
    return element
  }
}

/**
 * 比较两个对象是否相等
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
export function shallowEqual(obj1={}, obj2={}){
  if(obj1 === obj2) return true; // 如果两个对象是同一个对象，那么肯定相等
  if(typeof obj1 !== 'object' || obj1 === null) return false; // 如果obj1不是对象或者是null，那么肯定不相等
  if(typeof obj2 !== 'object' || obj2 === null) return false; // 如果obj2不是对象或者是null，那么肯定不相等

  let keys1 = Object.keys(obj1);// 获取obj1的所有key
  let keys2 = Object.keys(obj2); // 获取obj2的所有key
  if(keys1.length !== keys2.length) return false; // 如果两个对象的key的个数不一样，那么肯定不相等
  for(let key of keys1){ // 遍历obj1的所有key
    if(!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]){ // 如果obj2没有这个key，或者obj1和obj2的这个key对应的值不一样
      return false; 
    }
  }
  return true;
}