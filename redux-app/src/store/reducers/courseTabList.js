import initialState from '../states/courseTabList.js'

// 每一个reducer必须返回整个state
export default function(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_COURSE_FIELD':
            console.log('reducer')
            console.log(action.field)
            return {
                ...state, // 使用扩展运算符将所有值都会返回
                curField: action.field
            }

        default:
            return state;
    }
}