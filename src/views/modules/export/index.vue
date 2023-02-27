<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name />
      <customizeExport />
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, toRefs, onMounted } from 'vue'
import customizeExport from './components/customizeExport.vue'

export default defineComponent({
  name: 'Export',
  components: { customizeExport },
  setup() {
    const state = reactive({})
    onMounted(() => {})
    return {
      onMounted,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.tipBox {
  font-size: 15px !important;

  .code {
    border-radius: 5px;
    padding: 0 5px;
    color: #666;
    background: #ddd;
  }
}
</style>
