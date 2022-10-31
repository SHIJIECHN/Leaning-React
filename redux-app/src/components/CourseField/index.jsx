import { Component } from "react";
import { getCourseFields } from "../../module/index.js";
import FieldItem from "./FieldItem.jsx";
import './index.css'

export default class CourseField extends Component {
    state = {
        fieldData: []
    }

    async getFieldData() {
        const fieldData = await getCourseFields();

        this.setState({
            fieldData
        })
    }

    componentDidMount() {
        this.getFieldData();
    }
    render() {
        // 先解构
        const { fieldData } = this.state,
            { changeCourseField, curField } = this.props;


        return (
            <div className="field-wrapper">
                <FieldItem
                    key={'-1'}
                    item={{ field: '-1', field_name: '全部课程' }}
                    curField={curField}
                    changeCourseField={() => changeCourseField('-1')}
                />
                {
                    fieldData.map((item, index) => {
                        return (
                            <FieldItem
                                key={index}
                                item={item}
                                curField={curField}
                                changeCourseField={() => changeCourseField(item.field)}
                            />
                        );
                    })
                }
            </div>
        )
    }
}