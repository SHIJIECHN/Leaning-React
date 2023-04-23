const User = (props) => {
    console.log('User render', props.location.state)
    return (
        <div>
            <h1>User</h1>
            <button onClick={()=> props.history.goBack(-1)}>返回</button>
        </div>
    )
}
export default User;