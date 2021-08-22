<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <canvas-sign v-model="url" @success="handleSuccess"></canvas-sign>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive } from "vue";
import CanvasSign from "@/components/canvas-sign/canvas-sign.vue";
import { Base } from "@antv/x6/lib/graph/base";

export default defineComponent({
  components: {
    CanvasSign,
  },
  setup(props, { emit }) {
    const url = ref("");
    const handleSuccess = (e: Base) => {
      console.log(e);
    };

    return {
      url,
      handleSuccess,
    };
  },
});
</script>

<style scoped lang='scss'>
</style>