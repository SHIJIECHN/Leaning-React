/**
 * HOC -> High Order Component
 * 
 * 1. HOC 不是React提供的API，高级的设计模式
 * 2. HOC是一个函数，接收一个组件参数， 返回一个新组件
 * 3. 普通组件返回的是UI，HOC返回的是一个新组件
 * 4. HOC不能修改参数组件，只能传入组件所需要的props
 * 5. HOC是一个没有副作用的纯函数
 * 6. HOC除了必须传入被包裹的组件参数以外。其余参数根据需求增加
 * 7. HOC不关心数据如何使用，包裹组件不关心数据从哪里来
 * 8. HOC和包裹组件直接唯一的契合点就是props
 * 
 * 存在的目的，帮解决了什么问题
 */



function listHoc(WrapperComponent, fetchListData) {

    return class extends React.Component {
        state = {
            listData: []
        }

        async componentDidMount() {
            const result = await fetchListData(this.props.field);
            this.setState({
                listData: result.data
            })
        }

        removeStudent(id) {
            this.setState({
                listData: this.state.listData.filter(item => item.id !== id)
            })
        }

        likeTeacher(id) {
            this.setState({
                listData: this.state.listData.map(item => {
                    if (item.id === id) {
                        item.like += 1
                    }
                    return item;
                })
            })
        }

        render() {
            return (
                <>
                    {
                        this.props.field === 'student'
                            ?
                            <WrapperComponent
                                data={this.state.listData}
                                removeStudent={this.removeStudent.bind(this)}
                            />
                            :
                            <WrapperComponent
                                data={this.state.listData}
                                likeTeacher={this.likeTeacher.bind(this)}
                            />
                    }
                </>

            )
        }
    }
}

export default listHoc;