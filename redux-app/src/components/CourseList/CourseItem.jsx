import { Component } from 'react'
import FieldItem from '../CourseField/FieldItem.jsx'

export default class CourseItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <li className='course-item'>{item.course_name}</li>
        )
    }
}