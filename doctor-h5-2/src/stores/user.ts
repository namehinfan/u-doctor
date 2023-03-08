import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref<User>()
    // 设置用户，登录后使用
    const saveUser = (u: User) => {
      userInfo.value = u
    }
    // 清空用户，退出后使用
    const delUser = () => {
      userInfo.value = undefined
    }
    return { userInfo, saveUser, delUser }
  },
  { persist: true}
)
