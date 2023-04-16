import React from './react';
import ReactDOM from './react-dom';

// 高阶组件来自于高阶函数，可以接收函数或者返回函数的函数，
const withLoading = OldComponent =>{ // 高阶组件
  return class extends React.Component{
    show = ()=>{
      let div = document.createElement('div');
      div.innerHTML = `
        <p id="loading" style="position:absolute;top:100px;left:50%;z-index:10;backgroud-color:gray;">loading</p>
      `;
      document.body.appendChild(div);
    }
    hide = () =>{
      document.getElementById('loading').remove();
    }
    render(){
      return <OldComponent {...this.props} show={this.show} hide={this.hide} />
    }
  }
}

@withLoading
class Panel extends React.Component{
  render(){
    return(
      <div>
        {this.props.title}
        {/* LoadingPanel没有传入show和hide，是由withLoading高阶组件代理产生的 */}
        <button onClick={this.props.show}>显示</button>
        <button onClick={this.props.hide}>隐藏</button>
      </div>
    )
  }
}

// const LoadingPanel = withLoading(Panel);

ReactDOM.render(<Panel title="这是标题"/>, document.getElementById('root'));

