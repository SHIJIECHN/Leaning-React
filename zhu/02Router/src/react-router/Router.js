import React from 'react';
import RouterContext from './RouterContext';
class Router extends React.Component{
    // 根匹配
    static computeRouteMatch(pathname){
        return {path:'/',url:'/',params:{},isExact:pathname === '/'}
    }
    constructor(props){
        super(props);
        this.state = {
            location:props.history.location
        }
        // 监听历史对象中的路径变换，当路径发生变化后执行回调函数，参数是最新的路径对象
        // 返回一个函数，调用这个函数可以取消监听
        this.unlisten = props.history.listen(location=>{
            this.setState({location});
        });
    }
    componentWillUnmount(){
        this.unlisten(); // 取消监听
    }
    render(){
        // Router提供的上下文对象中的值，包含history和location
        const value = {
            history:this.props.history, // 父传入。传递给Route用来判断路由是否匹配的
            location:this.state.location, // 用来让组件来跳转路径的
            match:Router.computeRouteMatch(this.state.location.pathname) // 根匹配
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;