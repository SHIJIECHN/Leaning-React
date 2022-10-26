import { axiosGet } from "../utils/http.js";
export function getCourseFields() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/v2/get_course_fields',
      success(data) {
        resolve(data.result);
      },
      err(err) {
        reject(err)
      }
    })
  })
}

export function getCourseList() {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: '/v2/get_courses/all',
      success(data) {
        resolve(data.result);
      },
      error(err) {
        reject(err);
      }
    })
  })
}