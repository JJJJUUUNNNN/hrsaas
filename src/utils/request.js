import axios from 'axios'
const service = axios.create()
// 1.请求拦截器
service.interceptors.request.use()
// 2.响应拦截器
service.interceptors.response.use()
export default service
