<template>
  <el-card :shadow="defaultData.cardShadow">
    <easy-echart
      :isSlot="false"
      echartsId="line-echart"
      :height="600"
      :colors="colors"
      :information="chart"
      title="折线图"
      types="line"
    />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import easyEchart from '@/components/easy-echart/index.vue'
import * as echarts from 'echarts'
import { lineFun } from '@/api/echarts/index'

export default defineComponent({
  name: 'EChartsLine',
  components: { easyEchart },
  setup() {
    let chart = reactive({ homeDateInfoResult: [], horizontalList: [] })
    // 曲线图颜色
    type ChartColor = {
      opacity: number
      color: any
    }
    const chartColor: ChartColor[] = [
      {
        opacity: 0.4,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#5BB1FF',
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)',
          },
        ]),
      },
      {
        opacity: 0.4,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#AD49FF',
          },
          {
            offset: 1,
            color: 'rgba(255,255,255,0)',
          },
        ]),
      },
    ]
    // 曲线图线段颜色
    const colors: string[] = [
      '#5BB1FF',
      '#AD49FF',
      '#F6A829',
      'rgb(85, 188, 255)',
    ]
    // 自定义线段颜色
    type UserLineColor = { value: { name: string; color: string }[] }
    let userLineColor = reactive<UserLineColor>({ value: [] })
    handleChart(0)

    function handleChart(status: number | string, _period = 'Seven') {
      lineFun().then((res) => {
        res.data.data.homeDateInfoResult.forEach((item: any, index: number) => {
          item.areaStyle = chartColor[index]

          userLineColor.value.push({
            name: item.name,
            color: colors[index],
          })
        })
        Object.assign(chart, res.data.data)
      })
    }
    return {
      chart,
      colors,
    }
  },
})
</script>

<style lang="scss" scoped></style>
