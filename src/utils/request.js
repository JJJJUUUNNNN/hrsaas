import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建了一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 设置超时时间
})

// 1.请求拦截器 - 统一注入token
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bear ${store.getters.token}'
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 2.响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  // 要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then？ 不能！ 应该进catch
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message)
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 进入catch
})
export default service
