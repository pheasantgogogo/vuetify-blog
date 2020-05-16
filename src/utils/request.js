import axios from 'axios'
import Qs from 'qs'

axios.defaults.baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://wangluhong.cn'
    : 'http://localhost:3000'
axios.defaults.timeout = 60000
axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  config.headers.common.Authorization = 'Bearer ' + token
  return config
})

export default function request({ method, url, params }) {
  if (method === 'Get') {
    return get(url, params)
  }
  if (method === 'Post') {
    return post(url, params)
  }
}

function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        url,
        Qs.stringify(params, {
          arrayFormat: 'brackets'
        })
      )
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
