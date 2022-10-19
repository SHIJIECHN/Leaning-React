// Fragment -> React -> Fragment
// doucment.createDocumentFragment()
// 创建文档碎片
/**
 * table tr
 * 多个td -> 节点
 * creatElement div <- tds
 * div -> append -> tr
 * 
 * React -> 每个组件都需要一个根节点 -> React.Fragment
 */
import Table from './Table.jsx'
import StaffList from './StaffList.jsx'

class App extends React.Component {
    render() {
        return (
            // <Table />
            <StaffList />
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)