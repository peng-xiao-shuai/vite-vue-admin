<template>
  <div class="app-container">
    <el-card :style="{ marginBottom: '20px' }" :shadow="defaultData.cardShadow">
      <antv-x6 />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import antvX6 from '@/components/antv-x6/index.vue'

export default defineComponent({
  name: 'AxtvX6',
  components: {
    antvX6,
  },
  setup() {},
})
</script>
