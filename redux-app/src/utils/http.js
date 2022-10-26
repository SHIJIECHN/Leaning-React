import axios from 'axios'
import qs from 'qs'


import { BASE_URL } from '../config/config.js'

function axiosGet(options) {
  axios(BASE_URL + options.url)
    .then(res => {
      options.success(res.data);
    })
    .catch(err => {
      options.error(err)
    })
}

export {
  axiosGet
}