import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,BrowserRouter , Route, Switch} from './react-router-dom';
/** 路由容器 -> Router， 路由规则/路由配置 -> Route */
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

ReactDOM.render(
    <HashRouter>
        <Switch>
            {/* exact={true} 精确匹配 */}
            <Route exact={true} path="/" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/profile" component={Profile}/>
        </Switch>
     </HashRouter>
    , 
    document.getElementById('root'))