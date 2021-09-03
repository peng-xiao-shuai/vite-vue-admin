<template>
  <div class="operate-container">
    <div>
      <i :class="[defaultData.iconfont,meta.icon]" style="margin-right: 5px"></i>
      <span>{{ t(meta.locale) }}</span>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRoute } from 'vue-router';
const meta = useRoute().meta

</script>

<style scoped lang='scss'>

</style>