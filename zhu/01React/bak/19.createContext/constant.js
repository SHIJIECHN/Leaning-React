// 表示这是一个文本类型的元素，在源码里没有这样的类型
// 字符串、数字进行特殊处理
export const REACT_TEXT = Symbol('REACT_TEXT'); // 用来标识这是一个文本类型的元素
export const REACT_FOREARD_REF_TYPE = Symbol('react.forward_ref'); // 用来标识这是一个转发ref的类型
export const REACT_PROVIDER = Symbol('react.provider'); // 用来标识这是一个Provider类型
export const REACT_CONTEXT = Symbol('react.context'); // 用来标识这是一个Consumer类型