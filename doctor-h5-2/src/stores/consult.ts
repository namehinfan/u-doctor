import type { ConsultType } from './../enums'
import type { ConsultIllness, PartialConsult } from './../types/consult'
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

    /** 设置病情描述 */
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }

    const setPatientId = (id: string) => {
      consult.value.patientId = id
    }

    return { consult, setType, setIllnessType, setDepId, setIllness, setPatientId }
  },    
  { persist: true }
)