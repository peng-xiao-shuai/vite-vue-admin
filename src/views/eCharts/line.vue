<template>
  <el-card :shadow="defaultData.cardShadow">
    <easy-echart
      :isSlot="false"
      echartsId="line-echart"
      :height="600"
      :colors="colors"
      :information="chart.value"
      title="折线图"
      types="line"
    ></easy-echart>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent, reactive } from "vue";
import easyEchart from "@/components/easy-echart/index.vue";
import * as echarts from "echarts";
import { lineFun } from "@/api/echarts/index";

export default defineComponent({
  name: "eChartsLine",
  components: { easyEchart },
  setup(props, context) {
    let chart = reactive({ value: {} });
    // 曲线图颜色
    const chartColor: any[] = [
      {
        opacity: 0.4,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#5BB1FF",
          },
          {
            offset: 1,
            color: "rgba(255,255,255,0)",
          },
        ]),
      },
      {
        opacity: 0.4,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#AD49FF",
          },
          {
            offset: 1,
            color: "rgba(255,255,255,0)",
          },
        ]),
      },
    ];
    // 曲线图线段颜色
    const colors: any[] = [
      "#5BB1FF",
      "#AD49FF",
      "#F6A829",
      "rgb(85, 188, 255)",
    ];
    // 自定义线段颜色
    let userLineColor: any = reactive({ value: [] });
    handleChart(0);

    function handleChart(status: number | string, period: string = "Seven") {
      lineFun().then((res: any) => {
        res.data.homeDateInfoResult.forEach((item: any, index: number) => {
          item.areaStyle = chartColor[index];

          userLineColor.value.push({
            name: item.name,
            color: colors[index],
          });
        });
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