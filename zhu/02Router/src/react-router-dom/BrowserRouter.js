import React from 'react';
import {Router} from '../react-router';
import {createBrowserHistory} from '../history';

// 创建一个hash history对象的方法，模拟一个自己的history对象，但是是用hash的方式实现的
class BrowserRouter extends React.Component{
    history = createBrowserHistory();
    render(){
        return (
            <Router history={this.history}>
                {this.props.children}
            </Router>
        
        )
    }
}

export default BrowserRouter;