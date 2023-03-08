import router from '@/router'
import { useUserStore } from '@/stores'
import axios from 'axios'
import { showFailToast, showToast } from 'vant'

export const baseURL = 'https://consult-api.itheima.net/'
const request = axios.create({
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
  function (res) {
    if (res.data?.code !== 10000) {
        showFailToast(res.data?.message)
        return Promise.reject(res.data)
      }
    return res.data
  },
  function (err) {
    if (err.response.status === 401) {
			 // 提示用户
      showToast('登录超时, 请重新登录')
      // 删除用户信息
      const store = useUserStore()
      store.delUser()
      // 跳转登录，带上接口失效所在页面的地址，登录完成后回跳使用
      router.push({
        path: '/login',
        query: { returnPath: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(err)
  }
)

export default request