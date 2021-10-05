<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useTitle } from '@/hooks/useTitle';
import { nextTick, onMounted } from 'vue';
onMounted(() => {
  useTitle()
})
</script>

<style>
body {
  margin: 0;
}
#app :deep(.el-drawer) {
  overflow: auto;
}
</style>
