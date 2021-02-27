<template>
	<div class="">
		<div :id="echartsId" style="width: 100%;height:250px;"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
	export default {
		props: {
			echartsId: String,
			information: Object,
			title: String,
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {}
		},
		mounted() {},
		watch: {
			information: {
				deep: true,
				immediate: true,
				handler(val) {
					console.log(val,this.echartsId,this.title);
					if (val.horizontalList) {
						switch (this.types) {
							case 'line':
								this.drawChart();
								break;
							case 'cake':
								this.cakeChart();
								break;
							default:
								this.pillarChart()
								break;
						}

					}
				}
			}
		},
		methods: {
			drawChart() {
				console.log('themeColor',);
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById(this.echartsId));
				// 指定图表的配置项和数据
				let option = {
					color: [this.themeColor, '#36a3f7', '#f4649e','#f4d45f','#cf91e7','#96f4b9'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						}
					},
					legend: {
						top: 30,
						right: 0,
						data: this.information.homeDateInfoResult.map(item => item.name)
					},
					grid: {
						left: '0%',
						right: '0%',
						bottom: '3%',
						// top: '0…',
						containLabel: true
					},
					title: {
						text: this.title,
						left: 'center'
					},
					xAxis: {
						type: 'category',
						data: this.information.horizontalList
					},
					yAxis: {
						type: 'value'
					},
					series: this.information.homeDateInfoResult
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},

			pillarChart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById(this.echartsId));
				
				let series = this.information.homeDateInfoResult.map((item,index) =>{
					let each = {
						type: 'bar',
						data: item.data,
						name: item.name,
					} 
					return each
				})
				
				
				
				// 指定图表的配置项和数据
				let option = {
					color: [this.themeColor, '#36a3f7', '#f4516c'],
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						top: 30,
						right: 0,
						data: this.information.homeDateInfoResult.map(item => item.name)
					},
					title: {
						text: this.title,
						left: 'center'
					},
					xAxis: {
						type: 'category',
						data: this.information.horizontalList
					},
					yAxis: [{
						type: 'value'
					}],
					series: series
				};

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			},

			cakeChart() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = echarts.init(document.getElementById(this.echartsId));

				let series = {}

				series.data = this.information.homeDateInfoResult[0].data.map((item, index) => {
					let each = {
						value: item,
						name: this.information.horizontalList[index]
					}

					return each
				})
				series.top = 40
				series.type = 'pie'
				series.radius = [20, 110]

				// 指定图表的配置项和数据
				let option = {
					color: [this.themeColor, '#18b1f7', '#f4516c', '#f2a2f4', '#f48864', '#f48c14', '#4bc2f4'],
					tooltip: {
						trigger: 'item',
						formatter: '{b}<br/>数量 {c} ({d}%)'
					},
					title: {
						text: this.title,
						left: 'center'
					},
					series: series
				};

				console.log(option);

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
			}
		},
	}
</script>

<style>
</style>
