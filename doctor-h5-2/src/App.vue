<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
// import { useUserStore } from './stores/user'
import { useUserStore } from './stores'

const store = useUserStore()

</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
