import type { ConsultType } from './../enums'
import type { ConsultIllness, PartialConsult } from './../types/consult'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    const consult = ref<PartialConsult>({})

    const isNotEmpty = computed(() => {
      console.log(consult.value)
      return (
        consult.value.illnessDesc ||
        consult.value.illnessTime ||
        consult.value.consultFlag !== undefined
      )
    })
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

    const clear = () => {
      consult.value = {}
    }

    return { consult, setType, setIllnessType, setDepId, setIllness, setPatientId,
      clear, isNotEmpty
    }
  },    
  { persist: true }
)