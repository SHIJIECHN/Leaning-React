import { getCourseFields, getCourseList } from '../module'
import React from 'react'
import { connect } from 'react-redux'
import CourseField from '../components/CourseField'
import CourseList from '../components/CourseList'
import { changeCourseField } from '../store/actions/courseTabList.js'

class IndexPage extends React.Component {
  render() {
    const { curField, changeCourseField } = this.props;
    console.log('Index')
    console.log(curField);
    return (
      <div className="page-wrapper">
        <CourseField
          curField={curField}
          changeCourseField={changeCourseField}
        />
        <CourseList
          curField={curField}
        />
      </div>
    )
  }
}

export default connect(
  // store里面的state
  function mapStateToProps(state) {
    return {
      curField: state.courseTabList.curField
    }
  },
  // reducer methods
  function mapDispatchToProps(dispatch) {
    return {
      changeCourseField: (field) => dispatch(changeCourseField(field))
    }
  }
)(IndexPage);