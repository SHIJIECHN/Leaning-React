import { Component } from "react";
import { getCourseList } from "../../module/index.js";
import CourseItem from './CourseItem.jsx'

export default class CourseList extends Component {
    state = {
        courseData: []
    }

    async getCourseData() {
        const courseData = await getCourseList();
        this.setState({
            courseData
        })
    }
    filterData(data, field) {
        if (field === '-1') {
            return data;
        }
        console.log(data, field)
        return data.filter(item => item.field === field)
    }

    componentDidMount() {
        this.getCourseData()
    }
    render() {
        const { courseData, curField } = this.state;
        return (
            <div className="course-wrapper">
                <ul className="course-list">
                    {
                        this.filterData(courseData, curField).map((item, index) => {
                            return (
                                <CourseItem
                                    key={index}
                                    item={item}
                                />
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}