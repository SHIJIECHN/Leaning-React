import { findDOM, compareTwoVdom } from "./react-dom.js";
export const updateQueue = {
  isBatchingUpdate: false, //通过此变量来控制是否批量更新
  updaters: [],
  batchUpdate() { // 批量更新
    for (let updater of updateQueue.updaters) {
      updater.updateComponent();
    }
    updateQueue.isBatchingUpdate = false;
    updateQueue.updaters.length = 0;
  }
}
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance; // 组件的实例
    this.pendingStates = []; // 队列。保存将要更新的队列
    this.callbacks = [];//保存将要执行的回调函数
  }

  addState(partialState, callback) {
    this.pendingStates.push(partialState);
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
    // 触发更新
    this.emitUpdate();
  }
  // 不管状态变化和属性变化都会让组件刷新，都调用此方法
  emitUpdate(nextProps) {
    this.nextProps = nextProps;// 可能会传过来一个新的属性对象
    // 后面会在此行加判断，判断批量更新的变量，如果是异步就先不更新，如果是同步则直接更新
    if (updateQueue.isBatchingUpdate) {
      // 如果当前处于批量更新模式，就把此updater实例添加到updateQueue队列里面去
      updateQueue.updaters.push(this)
    } else {
      this.updateComponent();// 让组件更新
    }
  }
  updateComponent() {
    let { classInstance, pendingStates, nextProps } = this;
    if (nextProps || pendingStates.length > 0) { // 如果有等待更新
      shouldUpdate(classInstance, nextProps, this.getState()); // 参数1 组件的实例，
    }
  }
  // 根据老状态和pendingStates这个更新队列，计算新状态
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance; // 获取原始的组件状态
    pendingStates.forEach(nextState => {
      if (typeof nextState === 'function') { // setState传入的是函数
        nextState = nextState(state); // 传入老的状态，执行后返回新的状态
      }
      state = { ...state, ...nextState }; // 合并状态
    })
    pendingStates.length = 0; // 清空队列
    this.callbacks.forEach(callback => callback()); // 执行callback
    this.callbacks.length = 0;
    return state; // 返回新状态
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  classInstance.state = nextState;// 真正修改实例的状态
  classInstance.forceUpdate();// 然后调用类组件实例的forceUpdate进行更新
}


export class Component {
  static isReactComponent = true; // 源码写法Component.prototype.isReactComponent = {}
  constructor(props) {
    this.props = props;
    this.state = {};
    // 每一个类组件的实例有一个updater更新器
    this.updater = new Updater(this);
  }

  setState(partialState, callback) {
    this.updater.addState(partialState, callback);
  }

  /**
   * 组件更新逻辑。走DOM diff
   * 1. 获取老的虚拟DOM React元素
   * 2. 根据最新的属性和状态计算新的虚拟DOM
   * 然后进行比较，查找差异，然后把这些差异同步到真实DOM上
   */
  forceUpdate() {
    let oldRenderVdom = this.oldRenderVdom; // 拿到老的虚拟DOM
    let oldDOM = findDOM(oldRenderVdom);// 根据老的虚拟DOM，查到老的真实DOM
    let newRenderVdom = this.render(); // 在shouldUpdate的时候，state状态已经是最新的，可以已经计算出新的虚拟DOM
    compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVdom);// 比较差异，把更新同步到真实的DOM上
    this.oldRenderVdom = newRenderVdom;// 把更新给oldRenderVdom
  }
}