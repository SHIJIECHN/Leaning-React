import { wrapToVdom } from './utils.js'
/**
 * 创建元素
 * @param {*} type 类型
 * @param {*} config 配置项
 * @param {*} children 第一个儿子
 */
function createElement(type, config, children) {
  let props = { ...config };
  if (arguments.length > 3) { // 实际传入的参数如果大于3，说明有多个儿子节点
    // 为了后续DOM-Diff方便，我们主动在这里进行了一些处理，源码里面没有
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    // children：字符串、数字、null、undefined、数组
    props.children = wrapToVdom(children);
  }
  return {
    type,
    props
  }
}

const React = {
  createElement
}
export default React;