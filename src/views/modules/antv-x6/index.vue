<template>
  <div class="app-container">
    <el-card :style="{ marginBottom: '20px' }" :shadow="defaultData.cardShadow">
      <antv-x6></antv-x6>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import antvX6 from "@/components/antv-x6/index.vue";

export default defineComponent({
  name: "axtv-x6",
  components: {
    antvX6,
  },
  setup(props) {},
});
</script>
<style lang="scss" scoped>
</style>