<template>
	<div>

		<div class="grid">
			<div class="eachDiv">
				<panel-group :count='count' />
				<el-card :shadow="defalutData.cardShadow">
					<div class="echartsBox">
						<el-row :gutter="32">
							<el-col :xs="24" :sm="24" :lg="24">
								<div class="un-handle-layout">
									<div>
										<homeEcharts echartsId='chart' :colors='colors' :information='chart.value' title='12个月用户登录曲线图' types='line'></homeEcharts>
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-card>
			</div>

			<div class="eachDiv">
				<div class="moneyGrid">
					<div class="eachDiv">
						2
					</div>

					<div class="eachDiv">
						2
					</div>

					<div class="eachDiv eachDiv-3">
						2
					</div>
				</div>
			</div>
			<div class="eachDiv eachDiv3">
				<el-card :shadow="defalutData.cardShadow">
					<div class="echartsBox">
						<div class="un-handle-layout">
							<homeEcharts echartsId='pageviewData' :colors='colors' :information='pageviewData.value' types='pie' title='浏览量饼状图'></homeEcharts>
						</div>
					</div>
				</el-card>
			</div>
			<div class="eachDiv eachDiv4">
				<el-card :shadow="defalutData.cardShadow">
					<div class="un-handle-layout">
						<!-- <homeEcharts echartsId='mian2' :information='investigation' types='line' title='30天排查统计'></homeEcharts> -->
					</div>
				</el-card>
			</div>
		</div>

	</div>
</template>

<script lang='ts'>
import homeEcharts from "./components/homeEcharts.vue"
import PanelGroup from './components/PanelGroup.vue'
import lineBarEcharts from './components/lineBarEcharts.vue'

import { useStore } from 'vuex';
import * as echarts from 'echarts';

import {
	pageviewChart,
	countFun,
	chartFun,
} from "/@/api/home"
import { defineComponent, reactive, ref } from "vue";

const countsArr:any[] = [{
	icon: 'vitehome-user',
	title: '用户',
	value: '',
	key: 'users',
	color: '#646cff ',
},{
	icon: 'vitehome-shoppings',
	title: '购物车',
	value: '',
	key: 'shoppings',
	color: '#9d5aff  ',
},{
	icon: 'vitehome-pageview',
	title: '浏览量',
	value: '',
	key: 'pageview',
	color: '#55bcff ',
},{
	icon: 'vitehome-done',
	title: '已完成',
	value: '',
	key: 'done',
	color: '#F6C22A ',
}]

console.log(useStore());

export default defineComponent({
		name: 'home',
		components: {
			homeEcharts,
			PanelGroup,
			lineBarEcharts
		},
		setup(){
			// 曲线图颜色
			const chartColor:any[] = [{
				opacity: 0.2,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: 'rgb(157, 90, 255)'
				}, {
					offset: 1,
					color: 'rgb(157, 90, 255)'
				}])
			},{
				opacity: 0.2,
				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
					offset: 0,
					color: useStore().state.settings.themeColor
				}, {
					offset: 1,
					color: useStore().state.settings.themeColor
				}])
			}]

			// 曲线图线段颜色
			const colors:any[] = ['rgb(157, 90, 255)',useStore().state.settings.themeColor,'#F6C22A','rgb(85, 188, 255)']
			
			let count= reactive(countsArr)
			let chart= reactive({value: {}})
			let pageviewData = reactive({value:{}})

			// 18个月数据
			let user = reactive<any | null>(null)
			// 30天资料,试题数据
			let reform= reactive<any | null>(null)
			let investigation= reactive<any | null>(null)

			// 浏览量
			function handlePageview() {
				pageviewChart()
				.then((res:any) => {
					pageviewData.value = res.data;
				})
			}

			function handleChart() {
				chartFun()
				.then(res => {
					res.data.homeDateInfoResult.forEach((item:any,index:number) =>{
						item.areaStyle = chartColor[index]
					})
					chart.value = res.data;
					console.log(chart);
				})
			}

			function handleCount() {
				countFun()
				.then(res => {
					let i: any

					count.forEach((i) => {
						i.value = res.data[i.key]
					});
				})
			}

			// 统计
			handleCount();

			// 18用户数据
			handleChart()

			handlePageview()

			return{
				count,
				chart,
				pageviewData,
				colors,

				user,
				reform,
				investigation
			}
		}
	})
</script>

<style lang="scss" scoped>
	.grid{
		display: grid;
		grid-template-columns: 2fr 1fr;
		grid-column-gap: 20px;
		grid-row-gap: 20px;
		.eachDiv4{
			grid-row-start: 2;
			grid-column-start: 1;
		}

		.eachDiv{
			width: 100%;

			.moneyGrid{
				display: grid;
				grid-template-columns: 1fr 1fr;
				grid-column-gap: 20px;
				grid-row-gap: 20px;

				.eachDiv-3{
					grid-row-start: 2;
					grid-column-start: 1;
  					grid-column-end: 3;
				}

				.eachDiv{
					width: 100%;
					border: 1px solid red;
				}
			}
		}
	}
</style>

<style scoped>
	.app-container {
		margin-top: 40px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.total-layout {
		margin-top: 20px;
	}

	.total-frame {
		border: 1px solid #DCDFE6;
		padding: 20px;
		height: 100px;
	}

	.total-icon {
		color: #409EFF;
		width: 60px;
		height: 60px;
	}

	.total-title {
		position: relative;
		font-size: 16px;
		color: #909399;
		left: 70px;
		top: -50px;
	}

	.total-value {
		position: relative;
		font-size: 18px;
		color: #606266;
		left: 70px;
		top: -40px;
	}

	.un-handle-layout {
		/* margin-top: 20px; */
		/* border: 1px solid #DCDFE6; */
	}

	.layout-title {
		color: #606266;
		padding: 15px 20px;
		background: #F2F6FC;
		font-weight: bold;
	}

	.un-handle-content {
		padding: 20px 40px;
	}

	.un-handle-item {
		border-bottom: 1px solid #EBEEF5;
		padding: 10px;
	}

	.overview-layout {
		margin-top: 20px;
	}

	.overview-item-value {
		font-size: 24px;
		text-align: center;
	}

	.overview-item-title {
		margin-top: 10px;
		text-align: center;
	}

	.out-border {
		border: 1px solid #DCDFE6;
	}

	.statistics-layout {
		border: 1px solid #DCDFE6;
	}

	.mine-layout {
		position: absolute;
		right: 140px;
		top: 107px;
		width: 250px;
		height: 235px;
	}

	.address-content {
		padding: 20px;
		font-size: 18px
	}

	.chart-wrapper {
		height: 280px;
		background: #fff;
		box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.05);
		padding: 16px 16px 0;
		margin-bottom: 32px;
	}

	@media (max-width:1024px) {
		.chart-wrapper {
			padding: 8px;
		}
	}
</style>
