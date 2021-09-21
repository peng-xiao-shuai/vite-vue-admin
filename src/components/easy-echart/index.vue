<template>
  <div style="position: relative">
    <div class="echartTitle">{{ title }}</div>
    <div class="topOperate" v-if="isSlot">
      <slot></slot>
      <slot name="lineColor"></slot>
      <slot name="timeSwiper"></slot>
    </div>
    <div
      :id="echartsId"
      :style="{
        width: '100%',
        height: isSlot ? height - 30 - 45 + 'px' : height - 30 + 'px',
      }"
    ></div>
  </div>
</template>

<script>
/**
 * 简单封装图表
 * 注意：线性图和柱形图 是通过 homeDateInfoResult 数据直接赋值到 series
 * 饼图则只要 horizontalList 数组即可 模板:[{
 *  value: '',
 *  name: ''
 * }]
 * 默认南丁格尔玫瑰图
 */
import { defineComponent, shallowRef, onMounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    // 图表id
    echartsId: String,
    colors: Array,
    // 数据集
    information: Object,
    // 标题
    title: String,
    //isSlot && 图表减去插槽高度
    isSlot: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 250
    },
    // 图表类型
    types: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
      myChart.value = echarts.init(document.getElementById(props.echartsId))
    })
    const myChart = shallowRef(null)
    // 记录
    let old = []

    watchEffect(() => {
      let merge = old.length == (props.information.homeDateInfoResult && props.information.homeDateInfoResult.length) ? false : true
      if (props.information.horizontalList) {
          old = props.information.homeDateInfoResult
          
          switch (props.types) {
            case 'line':
              lineEchart(merge)
              break
            case 'pie':
              cakeChart()
              break
            case 'homeCake':
              homeCakeChart()
              break
            default:
              pillarChart()
              break
          }

        }
    })

    // 线
    const lineEchart = (merge) => {
      // 指定图表的配置项和数据
      let option = {
        color: props.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        // legend: {
        // 	data: this.information.homeDateInfoResult.map(item => item.name || '')
        // },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        title: {
          // text: this.title,
          // left: 'left'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.information.horizontalList
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: props.information.homeDateInfoResult
      }

      
      // myChart.value.clear();
      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option, merge)
      window.addEventListener("resize", () => { myChart.value.resize() })
    }
    // 柱状
    const pillarChart = () => {
      // 指定图表的配置项和数据
      let option = {
        color: props.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          // text: props.title,
          // left: 'center'
        },
        grid: {
          left: '0%',
          right: '0%',
          bottom: '3%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: props.information.horizontalList
        },
        yAxis: [{
          type: 'value'
        }],
        series: props.information.homeDateInfoResult
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option)

      window.addEventListener("resize", () => { myChart.value.resize() })

    }

    // 饼图 
    // 默认南丁格尔玫瑰图
    const cakeChart = () => {
      let series = {
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        label: {
          show: false
        },
        itemStyle: {
          borderRadius: 8
        },
      }

      series.data = props.information.horizontalList.map((item, index) => {
        let each = {
          value: item.value,
          name: item.name
        }

        return each
      })

      // 指定图表的配置项和数据
      let option = {
        color: props.colors,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          y: 'center',  //图例上下居中
          right: '5%',
          orient: 'vertical',
          backgroundColor: 'rgb(228, 230, 255)',
          borderRadius: 5,
          padding: [25, 15, 25, 15],
          icon: "pin"
        },
        title: {
          // text: this.title,
          // left: 'left'
        },
        series: series
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option)
      window.addEventListener("resize", () => { myChart.value.resize() })
    }

    // 首页单独饼图
    const homeCakeChart = () => {
      console.log('并数据', props.information)
      let series = {
        center: ['30%', '50%'],
        type: 'pie',
        radius: ['45%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '15',
            fontWeight: 'bold',
            formatter: '{b} \n\n {d}%'
          }
        },
        labelLine: {
          show: false
        }
      }

      series.data = props.information.horizontalList.map((item, index) => {
        let each = {
          value: item.value,
          name: item.name
        }

        return each
      })

      // 指定图表的配置项和数据
      let option = {
        color: props.colors,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          y: 'center',  //图例上下居中
          right: '5%',
          orient: 'vertical',
          backgroundColor: 'rgb(228, 230, 255)',
          borderRadius: 5,
          padding: [25, 15, 25, 15],
          icon: "pin"
        },
        title: {
          // text: this.title,
          // left: 'left'
        },
        series: series
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.value.setOption(option)
      window.addEventListener("resize", () => { myChart.value.resize() })
    }
  }
})
</script>

<style scoped>
.echartTitle {
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.topOperate {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}
</style>
