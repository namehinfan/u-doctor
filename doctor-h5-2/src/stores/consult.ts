import type { ConsultType } from './../enums'
import type { PartialConsult } from './../types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})

    const setType = (type: ConsultType) => {
      consult.value.type = type
    }

    const setIllnessType = (type: 0 | 1) => {
      consult.value.illnessType = type
    }

    const setDepId = (id: string) => {
      consult.value.depId = id
    }

    return { consult, setType, setIllnessType, setDepId }
  },    
  { persist: true }
)