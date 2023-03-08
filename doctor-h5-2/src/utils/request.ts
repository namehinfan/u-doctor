import { useUserStore } from '@/stores'
import axios from 'axios'

export const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

request.interceptors.request.use(
  function (config) {
    const store = useUserStore()
    const token = store.userInfo?.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    // TODO 3. 处理业务失败
    // TODO 4. 摘取核心响应数据
    return res
  },
  (err) => {
    // TODO 5. 处理401错误
    return Promise.reject(err)
  }
)

export default request