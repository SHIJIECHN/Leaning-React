import { wrapToVdom } from './utils.js'
import { Component } from './Component';
/**
 * 创建元素。运行的时候，内部会自动调用这个方法，不用我们手动调用
 * @param {*} type 类型
 * @param {*} config 配置项
 * @param {*} children 第一个儿子
 */
function createElement(type, config, children) {
  // 有两个比较特殊的属性：ref和key
  let ref; // 是用来获取虚拟DOM实例的
  let key; // 用来区分同一个父亲的不同儿子的
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  let props = { ...config }; // 配置项。没有ref和key的
  if (arguments.length > 3) { // 实际传入的参数如果大于3，说明有多个儿子节点
    // 为了后续DOM-Diff方便，我们主动在这里进行了一些处理，源码里面没有
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else {
    // children：字符串、数字、数组
    props.children = wrapToVdom(children);
  }
  return {
    type,
    props,
    ref, // 返回
    key
  }
}

/** 类组件使用 */
function createRef() {
  return { current: null }
}

/** 函数组价使用 */
// function forwardRef(FunctionComponent) {
//   // 返回一个类组件
//   return class extends Component {
//     render() {
//       return FunctionComponent(this.props, this.props.ref); // 执行函数组件
//     }
//   }
// }
function forwardRef(FunctionComponent) {
  // 返回一个类组件
  return class extends Component {
    render() {
      return FunctionComponent(this.props, this.props.ref); // 执行函数组件
    }
  }
}

const React = {
  createElement,
  Component,
  createRef,
  forwardRef
}
export default React;