import React from 'react'
import store from '../store'

class Counter1 extends React.Component{
    state = {
        number: 0
    }
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({
                number: store.getState().number
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={()=> store.dispatch({type: 'ADD'})}>+</button>
                <button onClick={()=> store.dispatch({type: 'MINUS'})}>-</button>
            </div>
        )
    }
}

export default Counter1;