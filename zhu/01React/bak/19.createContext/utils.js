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