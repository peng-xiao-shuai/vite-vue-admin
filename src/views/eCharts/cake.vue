<template>
  <el-card :shadow="defaultData.cardShadow">
    <easy-echart
      :isSlot="false"
      echartsId="pillar-cake"
      :height="600"
      :colors="colors"
      :information="chart.value"
      title="南丁格尔玫瑰图"
      types="pie"
    />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import easyEchart from '@/components/easy-echart/index.vue'
import { cakeFun } from '@/api/echarts/index'

export default defineComponent({
  name: 'EChartsLine',
  components: { easyEchart },
  setup() {
    let chart = reactive({ value: {} })

    // 曲线图线段颜色
    const colors: string[] = [
      'rgb(61,94,216)',
      '#AD49FF',
      '#FFCB4D',
      '#FF534F',
      '#5BB1FF',
      '#27B276',
      '#FF8149',
    ]

    handlePageview()
    // 浏览量
    function handlePageview() {
      cakeFun().then((res) => {
        chart.value = res.data
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
