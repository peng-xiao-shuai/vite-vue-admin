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
import { defineComponent } from 'vue'
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
  watch: {
    information: {
      deep: true,
      immediate: true,
      handler (val, old) {
        // console.log(val, this.echartsId, this.title)

        if (val.horizontalList) {
          // 图表是否合并渲染
          let merge = old.homeDateInfoResult && val.homeDateInfoResult.length == old.homeDateInfoResult.length ? false : true
          switch (this.types) {
            case 'line':
              this.lineEchart(merge)
              break
            case 'pie':
              this.cakeChart()
              break
            case 'homeCake':
              this.homeCakeChart()
              break
            default:
              this.pillarChart()
              break
          }

        }
      }
    }
  },
  methods: {
    // 线
    lineEchart (merge) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.echartsId),)
      // 指定图表的配置项和数据
      let option = {
        color: this.colors,
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
          data: this.information.horizontalList
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.information.homeDateInfoResult
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, merge)
      window.addEventListener("resize", () => { myChart.resize() })
    },
    // 柱状
    pillarChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.echartsId))

      // 指定图表的配置项和数据
      let option = {
        color: this.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          // text: this.title,
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
          data: this.information.horizontalList
        },
        yAxis: [{
          type: 'value'
        }],
        series: this.information.homeDateInfoResult
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

      window.addEventListener("resize", () => { myChart.resize() })

    },

    // 饼图 
    // 默认南丁格尔玫瑰图
    cakeChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.echartsId))
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

      series.data = this.information.horizontalList.map((item, index) => {
        let each = {
          value: item.value,
          name: item.name
        }

        return each
      })

      // 指定图表的配置项和数据
      let option = {
        color: this.colors,
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
      myChart.setOption(option)
      window.addEventListener("resize", () => { myChart.resize() })
    },

    // 首页单独饼图
    homeCakeChart () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.echartsId))
      console.log('并数据', this.information)
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

      series.data = this.information.horizontalList.map((item, index) => {
        let each = {
          value: item.value,
          name: item.name
        }

        return each
      })

      // 指定图表的配置项和数据
      let option = {
        color: this.colors,
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
      myChart.setOption(option)
      window.addEventListener("resize", () => { myChart.resize() })
    }
  },
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
