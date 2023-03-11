<script lang="ts" setup>
import type { Doctor } from '@/types/consult'
import { followAPI } from '@/services/consult'
import { showToast } from 'vant';
import { ref } from 'vue';

const props = defineProps<{item:Doctor}>()

interface Emits {
  (name: 'followById', id: string): void
}
const emit = defineEmits<Emits>()
const follow = async () => {
  await followAPI(props.item.id)
  showToast(props.item.likeFlag ? '取消关注' : '关注成功')
  emit('followById', props.item.id)
}
// const loading = ref(false)
// const follow = async (item: Doctor) => {
//   loading.value = true
//   try {
//     await followAPI(item.id)
//     item.likeFlag = item.likeFlag === 1 ? 0 : 1
//   } finally {
//     loading.value = false
//   }
// }
</script>
<template>
  <div class="doctor-card">
    <van-image
      round
      :src="item.avatar"
    />
    <p class="name">{{ item.name }}</p>
    <p class="van-ellipsis">{{ item.hospitalName }} {{ item.depName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button 
      @click="follow"
      round 
      size="small" 
      type="primary" 
      :plain="!item.likeFlag"
    >
      {{ item.likeFlag ? "已关注" : "+ 关注" }}
    </van-button>
  </div>
</template>
<style scoped lang="scss">
.doctor-card {
  width: 135px;
  height: 190px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  display: inline-block;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: top;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
    &.name {
      font-size: 13px;
      color: var(--cp-text1);
      margin-bottom: 5px;
    }
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
