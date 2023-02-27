<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <canvas-sign v-model="url" @success="handleSuccess" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CanvasSign from '@/components/canvas-sign/canvas-sign.vue'
import { Base } from '@antv/x6/lib/graph/base'

export default defineComponent({
  components: {
    CanvasSign,
  },
  setup() {
    const url = ref('')
    const handleSuccess = (e: Base) => {}

    return {
      url,
      handleSuccess,
    }
  },
})
</script>

<style lang="scss" scoped></style>
