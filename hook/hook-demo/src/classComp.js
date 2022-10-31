import { Component, PureComponent } from "react";
import { withInfo } from './service/index.js'

class List extends PureComponent {
  render() {
    const { info, render } = this.props;
    return (
      <ul dangerouslySetInnerHTML={{ __html: info.map(item => render(item)) }}>
      </ul>
    )
  }
}

class App extends Component {

  itemTpl = item => {
    // var tpl = '';
    //   for (let [key, value] of Object.entries(item)) {
    //     if (typeof value === 'object') {
    //       tpl += `<ul><li>${key}: ${this.itemTpl(value)}</li></ul>`
    //     } else {
    //       tpl += `<li>${key}: ${value}</li>`
    //     }

    //   }
    //   return tpl;
    return Object.entries(item).reduce((prev, [key, value]) => {
      if (typeof value === 'object') {
        return prev += `<ul><li>${key}: ${this.itemTpl(value)}</li></ul>`
      } else {
        return prev += `<li>${key}: ${value}</li>`
      }
    }, '')
  }

  render() {
    return (
      <div>
        <List {...this.props} render={this.itemTpl} />
      </div>
    )
  }
}

const WithInfoApp = withInfo(App);

export default WithInfoApp;