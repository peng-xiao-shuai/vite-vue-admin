<template>
  <div class="">
    <div :id="echartsId" ref="chart" style="width: 100%; height: 250px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    echartsId: String,
    dataECharts: Object,
    title: String
  },
  data () {
    return {}
  },
  mounted () { },
  watch: {
    dataECharts: {
      deep: true,
      immediate: true,
      handler (val) {
        console.log(val)
        // if(val.horizontalList){
        // 	console.log(1);
        this.drawChart(this.dataECharts)
        // }
      }
    }
  },
  mounted () {
    // this.drawChart(this.dataECharts);
  },
  methods: {
    drawChart (dataECharts) {
      // 基于准备好的dom，初始化echarts实例
      var bar_dv = this.$refs.chart
      if (bar_dv) {
        // let myChart = echarts.init(document.getElementById(this.echartsId));
        let myChart = echarts.init(bar_dv)
        // 指定图表的配置项和数据
        let option = {
          // title: {
          //   text: '调用',
          //   subtext: '调用分析'
          // },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: dataECharts.series.map(item => item.name)
          },
          grid: {
            left: '5%',
            right: '3%'
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {
                readOnly: false
              },
              magicType: {
                type: ['line', 'bar']
              },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: dataECharts.xAxisData
            // data: [
            //     "2019-05-21",
            //     "2019-05-22",
            //     "2019-05-23",
            //     "2019-05-24",
            //     "2019-05-25",
            //     "2019-05-26",
            //     "2019-05-27"
            // ]
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} 元'
            }
          },
          series: [
            {
              name: dataECharts.series[0].name,
              type: 'line',
              data: dataECharts.series[0].data,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              itemStyle: {
                color: '#5bd1db'
              },
              lineStyle: {
                width: 3
              },
              markLine: {
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}: {c} 元'
                },
                symbol: 'none',
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            },
            {
              name: dataECharts.series[1].name,
              type: 'line',
              data: dataECharts.series[1].data,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              itemStyle: {
                color: '#00ef09'
              },
              lineStyle: {
                width: 3
              },
              markLine: {
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}: {c} 元'
                },
                symbol: 'none',
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            },
            {
              name: dataECharts.series[2].name,
              type: 'line',
              data: dataECharts.series[2].data,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              itemStyle: {
                color: '#EB5252'
              },
              lineStyle: {
                width: 3
              },
              markLine: {
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}: {c} 元'
                },
                symbol: 'none',
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            },
            {
              name: dataECharts.series[3].name,
              type: 'line',
              data: dataECharts.series[3].data,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              itemStyle: {
                color: '#C8B2F4'
              },
              lineStyle: {
                width: 3
              },
              markLine: {
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}: {c} 元'
                },
                symbol: 'none',
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            },
            {
              name: dataECharts.series[4].name,
              type: 'line',
              data: dataECharts.series[4].data,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              itemStyle: {
                color: '#FFCB8C'
              },
              lineStyle: {
                width: 3
              },
              markLine: {
                label: {
                  show: true,
                  position: 'middle',
                  formatter: '{b}: {c} 元'
                },
                symbol: 'none',
                data: [
                  {
                    type: 'average',
                    name: '平均值'
                  }
                ]
              }
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
      } else {
        // console.log('bar-dv为空')
      }
    }
  }
};
</script>

<style></style>
