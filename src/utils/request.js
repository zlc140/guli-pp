import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { login } from '@/api/url'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 25000 // 请求超时时间,
})

// request拦截器
service.interceptors.request.use(config => {
  config.headers['Access-Token'] = store.getters.token
  config.headers['Content-Type'] = 'application/json'
  return config
}, error => {
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.status !== '200') {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 401:没有权限，从新登陆
      if (res.status === '401') {
        MessageBox.alert('登录失效请重新登录', '提示', {
          confirmButtonText: '重新登录',
          // cancelButtonText: '取消',
          type: 'warning',
          showClose: false
        }).then(() => {
          window.location.href = login
          store.dispatch('LoginOut').then(() => {
            window.location.href = `${login}?backUrl=${location.href}`
          })
        }).catch(() => {
          console.log('cancel')
        })
      }
      if (res.status === '500') {
        window.location.href = '/500'
      }
      // return response.data
      return Promise.reject(response.data)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// 错误处理
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    // window.location.href = '/500'
    return Promise.reject(error)
  }
)

export default service
