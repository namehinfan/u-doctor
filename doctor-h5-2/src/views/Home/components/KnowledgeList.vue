<script setup lang="ts">
import { ref } from "vue";
import KnowledgeCard from "./KnowledgeCard.vue";
import type { Knowledge, KnowledgeType, KnowledgeParams } from "@/types/consult"
import { getKnowledgePageAPI } from "@/services/consult";


const props = defineProps<{ type: KnowledgeType}>()

const list = ref<Knowledge[]>([])
const loading = ref(false)

const params = ref<KnowledgeParams>({
  current: 1,
  pageSize: 10,
  type: props.type
})

const total = ref(999999)

const onLoad = async () => {
  const res = await getKnowledgePageAPI(params.value)
  console.log(res);
  
  params.value.current++
  loading.value = false
  list.value.push(...res.data.rows)
  total.value = res.data.total
}
</script>

<template>
  <div class="knowledge-list">
    <van-list 
      @load="onLoad" 
      v-model:loading="loading" 
      :finished="list.length >= total"
      finished-text="没用更多数据了"
    >
      <knowledge-card v-for="item in list" :item="item" :key="item.id" />
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.knowledge-list {
  padding: 0 15px;
}
</style>
