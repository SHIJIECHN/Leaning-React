export class Component {
  static isReactComponent = true; // 源码写法Component.prototype.isReactComponent = {}
  constructor(props) {
    this.props = props;
  }
}