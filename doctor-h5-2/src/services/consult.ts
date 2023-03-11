import request from "@/utils/request"
import type { FollowType, KnowledgeParams } from '@/types/consult'

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


