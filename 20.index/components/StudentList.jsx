class StudentList extends React.Component {
  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <td>ID</td>
            <td>姓名</td>
            <td>年级</td>
            <td>删除</td>
          </tr>
        </thead>
        <tbody>
          {
            this.props.data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.grade}</td>
                <td>
                  <button onClick={() => this.props.removeStudent(item.id)}>删除</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default StudentList;