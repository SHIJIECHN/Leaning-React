import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';
class Switch extends React.Component{
    static contextType = RouterContext;

    render(){
        const {location} = this.context;
        let element,match;
        // this.props.children可能是数组，可能是对象，可能是字符串...，如果自己判断会很麻烦，
        // 可以使用React.Children.forEach遍历，就是把this.props.children转换成数组，然后遍历数组
        React.Children.forEach(this.props.children,route=>{
            console.log(route)
            // 如果是一个合法的元素，并且没有匹配上，一旦有匹配上的，就不再匹配
            if(!match&&React.isValidElement(route)){
                element = route;
                match = matchPath(location.pathname,route.props)
            }
        })
        console.log(match)
        return match?React.cloneElement(element,{computeMatch:match}):null
    }
}

export default Switch;