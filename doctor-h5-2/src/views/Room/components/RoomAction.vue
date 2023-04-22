<!-- 操作栏 -->
<script setup lang="ts">
import { ref } from 'vue';
import type { Image } from '@/types/consult'
import type { UploaderAfterRead } from 'vant/lib/uploader/types';
import { uploadAPI } from '@/services/consult';
import { showLoadingToast } from 'vant';

defineProps<{ disabled: boolean}>()

const text = ref('')

interface Emits {
  (name: 'send-text', value: string): void
  (name: 'send-image', value: Image): void
}
const emit = defineEmits<Emits>()

const onSendText = () => {
  emit('send-text', text.value)
  text.value = ''
}

const onAfterRead: UploaderAfterRead = async (item) => {
  if (!item) return
  if (Array.isArray(item)) return
  const loading = showLoadingToast('图片上传中')
  const res = await uploadAPI(item.file!)
  emit('send-image', res.data)
}
</script>

<template>
  <div class="room-action">
    <van-field
      v-model="text"
      type="text"
      class="input"
      :border="false"
      placeholder="问医生"
      autocomplete="off"
      @keyup.enter="onSendText"
      :disabled="disabled"
      :afterRead="onAfterRead"
    ></van-field>
    <!-- 不预览，使用小图标作为上传按钮 -->
    <van-uploader 
      :preview-image="false" 
      :disabled="disabled"
      :after-read="onAfterRead"
    >
      <cp-icon name="consult-img" />
    </van-uploader>
  </div>
</template>

<style lang="scss" scoped>
.room-action {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
  box-sizing: border-box;
  .input {
    background-color: var(--cp-bg);
    border: none;
    border-radius: 25px;
    margin-right: 10px;
    padding: 8px 15px;
  }
  .cp-icon {
    width: 24px;
    height: 24px;
  }
}
</style>