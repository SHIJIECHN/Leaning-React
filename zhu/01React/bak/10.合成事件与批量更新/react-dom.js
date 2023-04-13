import { REACT_TEXT } from "./constant.js";
import { addEvent } from './event.js'
/**
 * 把虚拟DOM转成真实DOM，插入到容器中
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  let newDOM = createDOM(vdom);
  container.appendChild(newDOM);
}

/**
 * 把虚拟DOM转成真实DOM
 * @param {*} vdom 虚拟DOM
 */
function createDOM(vdom) {
  let { type, props } = vdom;// 解构出类型type和属性props
  let dom;// 1. 先获取到真实DOM元素
  if (type === REACT_TEXT) { // 如果是一个文本元素，就创建一个文本节点
    dom = document.createTextNode(props.content);
  } else if (typeof type === 'function') { // 说明是一个React函数组件的React元素
    if (type.isReactComponent) { // 类组件
      return mountClassComponent(vdom);
    } else { // 函数组件
      return mountFunctionComponent(vdom); // 挂载函数组件  
    }
  } else {
    dom = document.createElement(type); // 原生DOM类型
  }
  // 2. 更新元素属性
  if (props) {
    updateProps(dom, {}, props);
    // 它是个对象并且只有一个儿子
    if (typeof props.children == 'object' && props.children.type) {
      render(props.children, dom);
    } else if (Array.isArray(props.children)) { // 数组。多个儿子
      reconcileChildren(props.children, dom)
    } else { // null 或 undefined，不处理

    }
  }
  // 让虚拟DOM的dom属性指向它的真实dom
  vdom.dom = dom; // 这个在DOM-Diff的时候会使用
  return dom;
}

/** 类组件挂载 */
function mountClassComponent(vdom) {
  const { type, props } = vdom; // 获取类组件和属性
  const classInstance = new type(props); // 实例化组件
  let renderVdom = classInstance.render(); // 调用render方法，返回虚拟DOM
  //TODO 5.类组件更新
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;//将计算出来的虚拟DOM renderVdom挂载到类的实例上
  return createDOM(renderVdom);
}

/**
 * 也要返回真实DOM。执行函数组件得到返回的React元素，在把React元素转成真实DOM返回
 * @param {*} props 
 */
function mountFunctionComponent(vdom) {
  let { type, props } = vdom;
  let renderVdom = type(props); // type就是组件。这里是执行函数组件，返回虚拟DOM，我们使用的是React，createElement
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom);
}

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    let chilVdom = childrenVdom[i];
    render(chilVdom, parentDOM);
  }
}

/**
 * 根据虚拟DOM中的属性更新真实DOM
 * @param {*} dom 真实DOM
 * @param {*} oldProps 老的属性
 * @param {*} newProps 新的属性
 */
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) { // 遍历新的属性
    if (key === 'children') continue; // 后面会单独处理children属性，所以此方法跳过
    if (key === 'style') { // 样式
      let styleObj = newProps[key]; // 获取到新的样式属性
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) { // onClick
      // dom[key.toLocaleLowerCase()] = newProps[key]; // dom.onclick=handleClick
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    } else {
      dom[key] = newProps[key];
    }
  }
}

/**
 * 根据Vdom返回真实DOM
 */
export function findDOM(vdom) {
  let { type } = vdom;
  let dom;
  if (typeof type === 'function') { // 虚拟DOM组件的类型的话
    // 找他的oldRenderVdom的真实DOM元素
    dom = findDOM(vdom.oldRenderVdom);
  } else {
    dom = vdom.dom;
  }
  return dom;
}

// 比较新旧的虚拟DOM，找出差异更新到真实DOM上
export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  let oldDOM = findDOM(oldVdom);// 找到oldVdom对应的真实DOM
  let newDOM = createDOM(newVdom); // 根据新的虚拟DOM变成新的DOM
  parentDOM.replaceChild(newDOM, oldDOM);// 将来的DOM换成新的DOM
}

const ReactDOM = {
  render
}

export default ReactDOM;