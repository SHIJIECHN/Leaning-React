class Table extends React.Component {
    state = {
        headers: [
            'Name',
            'ID',
            "Age"
        ],
        info: [
            "Xiaoye Ai",
            "12333333",
            '35'
        ]
    }

    render() {
        return (
            <table border="1">
                {/* <caption> 标签定义表格的标题 */}
                <caption>Private Infomation</caption>
                <thead>
                    <tr>
                        <TableHeaders headers={this.state.headers} />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <TableCells info={this.state.info} />
                    </tr>
                </tbody>
            </table>
        )
    }
}

//使用fragment碎片避免每次新增th时都会套用div，达到不用div也可以包裹里面的元素内容
//同时也会报错: th不能作为div的子元素  
class TableHeaders extends React.Component {
    render() {
        return (

            <React.Fragment>
                {
                    this.props.headers.map((item, index) => (
                        <th key={index}>{item}</th>
                    ))
                }
            </React.Fragment>

        )
    }
}

class TableCells extends React.Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.info.map((item, index) => (
                        <td key={index}>{item}</td>
                    ))
                }
            </React.Fragment>
        )
    }
}

export default Table;