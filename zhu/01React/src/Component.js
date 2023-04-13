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
  emitUpdate() {
    // 后面会在此行加判断，判断批量更新的变量，如果是异步就先不更新，如果是同步则直接更新
    this.updateComponent();// 让组件更新
  }
  updateComponent() {
    let { classInstance, pendingStates } = this;
    if (pendingStates.length > 0) { // 如果有等待更新
      shouldUpdate(classInstance, this.getState()); // 参数1 组件的实例，
    }
  }
  // 根据老状态和pendingStates这个更新队列，计算新状态
  getState() {
    let { classInstance, pendingStates } = this;
    let { state } = classInstance; // 小伙去原始的组件状态
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

function shouldUpdate(classInstance, nextState) {
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

  }
}