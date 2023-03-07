<script setup lang="ts">
import { ref } from 'vue';

const gender = ref(1)
const show = ref(false)
</script>

<template>
  
  <CpNavBar />
  <CpRadioBtn 
    v-model="gender"
    :options="[
      {label:'男', value: 1},
      {label:'女', value:0}
    ]"
  />
  <cp-icon @click="show = !show" :name="`login-eye-${show? 'on' : 'off'}`" ></cp-icon>
</template>

<style lang="scss" scoped></style>
