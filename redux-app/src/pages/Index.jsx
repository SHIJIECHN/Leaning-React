import { getCourseFields, getCourseList } from '../module'
import React from 'react'
class IndexPage extends React.Component {

  async getDatas() {
    const courseFieldsData = await getCourseFields(),
      courseData = await getCourseList();

    console.log(courseFieldsData, courseData);
  }


  componentDidMount() {
    this.getDatas();
  }

  render() {
    return (
      <div className="page-wrapper">123</div>
    )
  }
}

export default IndexPage;