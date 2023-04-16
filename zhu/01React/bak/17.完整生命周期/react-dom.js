import { REACT_TEXT, REACT_FOREARD_REF_TYPE } from "./constant.js";
import { addEvent } from './event.js'
/**
 * 把虚拟DOM转成真实DOM，插入到容器中
 * @param {*} vdom 虚拟DOM
 * @param {*} container 容器
 */
function render(vdom, container) {
  let newDOM = createDOM(vdom);
  container.appendChild(newDOM);
  if (newDOM.componentDidMount) newDOM.componentDidMount();
}

/**
 * 把虚拟DOM转成真实DOM
 * @param {*} vdom 虚拟DOM
 */
function createDOM(vdom) {
  let { type, props, ref } = vdom;// 解构出类型type和属性props
  let dom;// 1. 先获取到真实DOM元素
  if (type && type.$$typeof === REACT_FOREARD_REF_TYPE) { // 支持React.forwardRef
    return mountForwardComponent(vdom)
  } else if (type === REACT_TEXT) { // 如果是一个文本元素，就创建一个文本节点
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
  if (ref) ref.current = dom; // 让ref.current属性指向真实DOM实例
  return dom;
}

/** React.forwardRef产生的组件进行挂载 */
function mountForwardComponent(vdom) {
  let { type, props, ref } = vdom;
  let renderVdom = type.render(props, ref); // 调用render方法
  vdom.oldRenderVdom = renderVdom;
  return createDOM(renderVdom)
}

/** 类组件挂载 */
function mountClassComponent(vdom) {
  const { type, props, ref } = vdom; // 获取类组件和属性
  let defaultProps = type.defaultProps;// 类默认属性
  let componentProps = { ...defaultProps, ...props }; //props是传过来的属性，两个合并
  const classInstance = new type(componentProps); // 实例化组件
  vdom.classInstance = classInstance; // 将classInstance挂载到vdom上
  if (classInstance.componentWillMount) classInstance.componentWillMount()
  let renderVdom = classInstance.render(); // 调用render方法，返回虚拟DOM
  //TODO 5.类组件更新
  classInstance.oldRenderVdom = vdom.oldRenderVdom = renderVdom;//将计算出来的虚拟DOM renderVdom挂载到类的实例上
  if (ref) ref.current = classInstance; // 让ref的current指向类组件实例
  let dom = createDOM(renderVdom);
  if (classInstance.componentDidMount) {
    // 给真实dom新增一个属性componentDidMount。暂时将didMount方法暂存到真实dom上
    dom.componentDidMount = classInstance.componentDidMount.bind(this);
  }
  return dom;
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
export function compareTwoVdom(parentDOM, oldVdom, newVdom, nextDOM) {
  if (!oldVdom && !newVdom) { // 如果老的虚拟DOM是null，新的虚拟DOM是null，就返回null

  } else if (oldVdom && (!newVdom)) { // 老的为不为null，新的为null，组件被销毁
    let currentDOM = findDOM(oldVdom); // 拿到老的虚拟DOM对应的dom
    currentDOM.parentNode.removeChild(currentDOM);// 删除老的真实DOM
    if (oldVdom.classInstance // 有实例
      && oldVdom.classInstance.componentWillUnmount // 并且实例上有componentWillUnmount方法
    ) {
      oldVdom.classInstance.componentWillUnmount();// 执行组件卸载方法
    }
  } else if (!oldVdom && newVdom) { // 老的没有，新的有，组件挂载
    let newDOM = createDOM(newVdom); // 创新新的真实DOM
    if (nextDOM) { // 如果有下一个节点，就插入到下一个节点前面，没有就插入到最后
      parentDOM.insertBefore(newDOM, nextDOM); //在nextDOM前面插入newDOM
    } else {
      parentDOM.appendChild(newDOM); // 将DOM添加到父DOM树中去 
    }
    if (newDOM.componentDidMount) newDOM.componentDidMount();
  } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)) {
    // 新老都有，但是类型不同。也不能复用，则需要删除老的，添加新的
    let oldDOM = findDOM(oldVdom); // 获取老的真实DOM
    let newDOM = createDOM(newVdom); // 创建新的真实DOM
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);// 把老的替换成新的
    if (oldVdom.classInstance // 有实例
      && oldVdom.classInstance.componentWillUnmount // 并且实例上有componentWillUnmount方法
    ) {
      oldVdom.classInstance.componentWillUnmount();// 执行组件卸载方法
    }
    if (newDOM.componentDidMount) newDOM.componentDidMount();
  } else { // 老的有，新的也有，类型也一样，需要复用老节点，进行深度的递归dom diff了
    updateElement(oldVdom, newVdom);
  }
}

/** 更新属性 */
function updateElement(oldVdom, newVdom) {
  // type类型：类组件、函数组件、文本组件
  if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) { // 文本节点更新
    let currentDOM = newVdom.dom = findDOM(oldVdom); // 老的文本节点的真实DOM
    if (oldVdom.props.content !== newVdom.props.content) { // 新的文本内容和老的不相等时执行
      currentDOM.textContent = newVdom.props.content; // 将新的文本内容赋值给老的节点文本内容
    }
  } else if (typeof oldVdom.type === 'string') {// 原生组件 div
    // 让新的虚拟DOM的真实DOM属性等于老的虚拟DOM对应的那个真实DOM
    let currentDOM = newVdom.dom = findDOM(oldVdom); // 拿到老的dom
    // 用新的属性更新DOM的老属性
    updateProps(currentDOM, oldVdom.props, newVdom.props);// 更新属性
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);// 更新儿子
  } else if (typeof oldVdom.type === 'function') { // 类组件和函数组件
    if (oldVdom.type.isReactComponent) {// 类组件
      updateClassComponent(oldVdom, newVdom);// 更新类组件
    } else {
      updateFunctionComponent(oldVdom, newVdom);// 函数组件
    }

  }
}

/** 函数组件 */
function updateFunctionComponent(oldVdom, newVdom) {
  let parentDOM = findDOM(oldVdom).parentNode;// 老的真实DOM的父节点
  let { type, props } = newVdom;
  let renderVdom = type(props);
  newVdom.oldRenderVdom = renderVdom;
  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
}

/** 类组件更新 */
function updateClassComponent(oldVdom, newVdom) {
  // 类组件更新：setState -> this.updater.addState -> this.emitUpdate
  // 类组件实例classInstance
  let classInstance = newVdom.classInstance = oldVdom.classInstance;// 从old上拿，同步到new上，因为下次更新是以new来更新
  newVdom.oldRenderVdom = oldVdom.oldRenderVdom; // 同步
  if (classInstance.componentWillReceiveProps) {// 因为此更新是由于父组件更新引起的，那么父组件重新渲染的时候，给子组件传递新的属性
    classInstance.componentWillReceiveProps();
  }
  classInstance.updater.emitUpdate(newVdom.props);// 更新
}

/**
 * 更新儿子
 * @param {*} parentDOM 
 * @param {*} oldVChildren 老的儿子
 * @param {*} newVChildren 新的儿子
 */
function updateChildren(parentDOM, oldVChildren, newVChildren) {
  // 格式化。将它们变成数组。
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);// 取长度的最大值
  for (let i = 0; i < maxLength; i++) {
    // 找当前的虚拟DOM节点之后的最近的一个虚拟DOM节点
    let nextVNode = oldVChildren.find((item, index) => index > i && item && findDOM(item));
    compareTwoVdom(parentDOM, oldVChildren[i], newVChildren[i], nextVNode && findDOM(nextVNode));// 比较
  }
}

const ReactDOM = {
  render
}

export default ReactDOM;

// export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
//   let oldDOM = findDOM(oldVdom);// 找到oldVdom对应的真实DOM
//   let newDOM = createDOM(newVdom); // 根据新的虚拟DOM变成新的DOM
//   parentDOM.replaceChild(newDOM, oldDOM);// 将来的DOM换成新的DOM
// }