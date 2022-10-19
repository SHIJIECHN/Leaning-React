export function fetchListData(field) {
  let url = '';

  switch (field) {
    case 'student':
      url = 'http://locahost:8888/getStudents';
      break;
    case 'teacher':
      url = 'http://locahost:8888/getTeachers';
      break;
    default:
      break;
  }

  return axios(url);
}