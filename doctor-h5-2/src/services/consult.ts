import request from "@/utils/request"
import type { FollowType, KnowledgeParams, OrderPreParams, PartialConsult } from '@/types/consult'

export const getKnowledgePageAPI = (params: KnowledgeParams) => {
  return request({ url: 'patient/home/knowledge', params })
}

export const getDoctorsAPI = (current ='1', pageSize = '5') => {
  return request({ url: "/home/page/doc", params: {current, pageSize} });
}

export const followAPI = (id: string, type: FollowType = 'doc') => {
   request({ url: "/like", method: "post", data: { id, type } })
}

export const getDepsAPI = () => request({ url: '/dep/all' })

export const uploadAPI = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request ({ url: 'upload', method: 'post', data: fd })
}

export const getPreOrderAPI = (params: OrderPreParams) => {
  return request({
    url: '/patient/consult/order/pre',
    params
  })
}

// 2.2 定义患者详情查询API
/** 查询患者详情 */
export const getPatientDetail = (id: string) => {
  return request({ url: `/patient/info/${id}` })
}

// 生成订单接口
export const createOrderAPI = (data: PartialConsult) => {
  return request({ url: '/patient/consult/order', method: 'post', data})
}

/** 请求支付地址接口的参数类型 */
export type PayParams = {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}

/** 获取支付地址  0 是微信  1 支付宝 */
export const getOrderPayUrl = (data: PayParams) => {
  return request({ url: '/patient/consult/pay', method: 'post', data })
}

/** 获取订单详情API */
export const getOrderDetailAPI = (orderId: string) => {
  return request({ url: '/patient/consult/order/detail', params: { orderId } })
}