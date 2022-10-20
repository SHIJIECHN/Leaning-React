/**
 * Student List 
 * {
 *  id, name, grade
 * }
 * 
 * Teacher List 
 * {
 *  id, name, subject, like
 * }
 */

// import { fetchListData } from './model'
// import StudentList from './components/StudentList.jsx'
// import TeacherList from './components/TeacherList.jsx'
// import listHoc from './components/ListHoc.jsx'

// const StudentListHoc = listHoc(StudentList, fetchListData);
// const TeacherListHoc = listHoc(TeacherList, fetchListData);

// class App extends React.Component {
//   // state = {
//   //   studentList: [],
//   //   teacherList: []
//   // }

//   // async componentDidMount() {
//   //   const studentData = await fetchListData('student');
//   //   const teacherData = await fetchListData('teacher');

//   //   this.setState({
//   //     studentList: studentData.data,
//   //     teacherList: teacherData.data
//   //   })
//   // }

//   // removeStudent(id) {
//   //   this.setState({
//   //     studentList: this.state.studentList.filter(item => item.id !== id)
//   //   })
//   // }

//   // likeTeacher(id) {
//   //   this.setState({
//   //     teacherList: this.state.teacherList.map(item => {
//   //       if (item.id === id) {
//   //         item.like += 1
//   //       }

//   //       return item;
//   //     })
//   //   })
//   // }

//   render() {
//     return (
//       <div className="app">
//         {/* <StudentList
//           data={this.state.studentList}
//           // this指向App组件
//           removeStudent={this.removeStudent.bind(this)}
//         >
//         </StudentList>
//         <TeacherList
//           data={this.state.teacherList}
//           likeTeacher={this.likeTeacher.bind(this)}
//         ></TeacherList> */}

//         <StudentListHoc field="student" />
//         <TeacherListHoc field="teacher" />
//       </div>
//     )
//   }
// }


import MyInput from './components/MyInput.jsx'
import InputHoc from './components/InputHoc.jsx'

const MyInputHoc = InputHoc(MyInput);

class App extends React.Component {
  state = {
    a: 1,
    b: 2,
    c: 3
  }
  render() {
    return (
      // 如何排除MyInputHoc传入的不需要的属性
      <MyInputHoc {...this.state} />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

/**
 * 横切关注点 -> mixins
 * 
 * 对参数组件本身的逻辑状态与视图的横向切割
 * 让HOC来完成逻辑和状态的管理
 * 让参数组件来完成视图的渲染
 * 
 * 让HOC将数据与逻辑传递到参数组件中
 * 从而完成关注点分离且有机结合的任务
 */