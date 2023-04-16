import { shallowEqual, wrapToVdom } from './utils.js'
import { Component,PureComponent } from './Component';
import { REACT_FOREARD_REF_TYPE, REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO } from './constant'
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
    if(typeof children !== 'undefined') props.children = wrapToVdom(children);
  }
  return {
    type,
    props,
    ref, // 返回
    key
  }
}

/**
 * 根据一个老元素，克隆一个新的元素
 * @param {*} oldElement 老元素
 * @param {*} newProps 新的属性
 * @param {*} children 新的儿子
 */
function cloneElement(oldElement, newProps, children) {
  if(arguments.length > 3){
    children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  }else{
    children = wrapToVdom(children);
  }
  let props = { ...oldElement.props, ...newProps, children };// 解构老属性，用新属性覆盖老属性
  return{ ...oldElement,props } // 解构老元素，用新props属性覆盖老元素的props属性
}
/** 
 * 类组件使用，创建一个ref
 * @returns 返回一个对象
 */
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
function forwardRef(render) {
  return {
    $$typeof: REACT_FOREARD_REF_TYPE,
    render // 原来的函数组件
  }
}

/**
 * createContext方法，返回一个对象，对象里面有两个属性：Provider和Consumer
 * @returns {Provider, Consumer}
 */
// function createContext() {
//   function Provider({ value, children }) { // value就是value属性，children就是Provider组件之间的内容
//     Provider._value = value;
//     return children;
//   }
//   function Consumer({children}) {
//     return children(Provider._value);
//   }
//   return { Provider, Consumer };
// }
function createContext(){
  let context = {$$typeof: REACT_PROVIDER}; // 声明一个context对象
  context.Provider = { $$typeof: REACT_PROVIDER, _context: context };
  context.Consumer = {$$typeof: REACT_CONTEXT, _context: context};
  return context;
}

/** memo方法 */
function memo(FunctionComponent, compare) {
  return {
    $$typeof: REACT_MEMO,
    type: FunctionComponent,
    compare: compare || shallowEqual
  }
}

const React = {
  createElement,
  Component,
  PureComponent,
  createRef,
  forwardRef,
  createContext,
  cloneElement,
  memo
}
export default React;

