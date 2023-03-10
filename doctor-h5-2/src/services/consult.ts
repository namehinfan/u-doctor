import request from "@/utils/request"
import type { KnowledgeParams } from '@/types/consult'

export const getKnowledgePageAPI = (params: KnowledgeParams) => {
  return request({ url: 'patient/home/knowledge', params })
}