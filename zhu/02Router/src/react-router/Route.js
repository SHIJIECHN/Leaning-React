import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath'

/**
 * 1. 获取到context中的值
 * 2. 匹配路由规则里的path，是否和当前地址中的url地址相等
 * 如果相等，就渲染component，否则不渲染
 */
class Route extends React.Component{
    static contextType = RouterContext;
    render(){
        const {history, location} = this.context;
        const {component:RouteComponent, computedMatch} = this.props;
        const match = computedMatch ? computedMatch:matchPath(location.pathname, this.props); // 当前路径的pathname是否和Route的path一样
        let renderElement = null;
        let routeProps = {history,location,match};
        // 如果匹配就展示component
        if(match){
            routeProps.match = match;
            renderElement = <RouteComponent {...routeProps}/>
        }
        return renderElement;
    } 
}
export default Route;