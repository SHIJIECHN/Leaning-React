const Home = (props) => {
    console.log('Home render', props)
    return (
        <div>
            <h1>Home</h1>
            {/* 第一个参数可以还是对象，也可以是字符串 */}
            <span>跳到/user的两种方式</span>
            <button onClick={()=> props.history.push('/user', {name: '用户管理'})}>跳到/user</button>
            <button onClick={()=> props.history.push({pathname:'/user',state:{name: '用户管理'}})}>跳到/user</button>
        </div>
    )
}
export default Home;