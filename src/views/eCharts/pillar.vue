<template>
  <el-card :shadow="defaultData.cardShadow">
    <easy-echart
      :isSlot="false"
      echartsId="pillar-echart"
      :height="600"
      :colors="colors"
      :information="chart.value"
      title="柱状图"
      types="pillar"
    ></easy-echart>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent, reactive } from "vue";
import easyEchart from "@/components/easy-echart/index.vue";
import * as echarts from "echarts";
import { pillarFun } from "@/api/echarts/index";

export default defineComponent({
  name: "eChartsLine",
  components: { easyEchart },
  setup(props, context) {
    let chart = reactive({ value: {} });
    // 曲线图线段颜色
    const colors: string[] = [
      "#5BB1FF",
      "#AD49FF",
      "#F6A829",
      "rgb(85, 188, 255)",
    ];

    handlePillar();
    function handlePillar() {
      pillarFun().then((res) => {
        chart.value = res.data;
      });
    }
    return {
      chart,
      colors,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>