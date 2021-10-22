<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name></view-name>
      <customizeExport></customizeExport>
    </el-card>
  </div>
</template>

<script lang='ts'>
import {
  ref,
  reactive,
  defineComponent,
  inject,
  nextTick,
  toRefs,
  onMounted,
} from "vue";
import { exportExcelSheet } from "@/utils/export";
import { tableData1 } from "./indexData";
import customizeExport from "./components/customizeExport.vue";

export default defineComponent({
  name: "icons",
  components: { customizeExport },
  setup() {
    const state = reactive({});
    onMounted(() => {});
    return {
      onMounted,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang='scss'>
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
