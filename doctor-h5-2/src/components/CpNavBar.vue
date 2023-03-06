<script setup lang="ts">
import router from '@/router';

interface Props {
  title?: string
  rightText?: string
  onBack?: () => void
}

const props = defineProps<Props>()

interface Emits {
  (e: 'click-right'): void
}

const emit = defineEmits<Emits>()

const clickLeft = () => {
  if (props.onBack) {
    props.onBack()
    return
  }
  router.back()
}
</script>

<template>
  <van-nav-bar 
    :title="title"
    :right-text="rightText" 
    @click-right="emit('click-right')"
    @click-left="clickLeft"
    placeholder 
    left-arrow 
    fixed 
  />
</template>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>