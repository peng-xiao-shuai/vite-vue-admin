<template>
	<div>
	<panel-group :count='count' />

    <el-card :shadow="defalutData.cardShadow" style="margin-bottom: 20px">
		<div class="echartsBox">
			<el-row :gutter="32">
				<el-col :xs="24" :sm="24" :lg="24">
					<div class="un-handle-layout">
						<div class="layout-title">18个月新增用户用户曲线图</div>
						<div style="padding: 0 3%;">
							<homeEcharts echartsId='vipuser' :information='user' types='line'></homeEcharts>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow" style="margin-bottom: 20px">
		<div class="echartsBox">
			<el-row :gutter="32">
				<el-col :xs="24" :sm="24" :lg="12">
					<div class="un-handle-layout">
						<homeEcharts echartsId='mian1' :information='reform' types='line' title='30天整改统计'></homeEcharts>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :lg="12">
					<div class="un-handle-layout">
						<homeEcharts echartsId='mian2' :information='investigation' types='line' title='30天排查统计'></homeEcharts>
					</div>
				</el-col>
			</el-row>
		</div>
    </el-card>

	</div>
</template>

<script>
	import homeEcharts from "./components/homeEcharts.vue"
	import PanelGroup from './components/PanelGroup.vue'
	import lineBarEcharts from './components/lineBarEcharts.vue'

	import {
		rectification,
		hiddenCurve,
		
		memberCount,
		hiddenCount,
		rectificationCount,
		
		userCurve,
	} from "/@/api/home"

	const DATA_FROM_BACKEND = {};
	export default {
		name: 'home',
		components: {
			homeEcharts,
			PanelGroup,
			lineBarEcharts
		},
		data() {
			return {
				count: {
					orderTotal: 0,
					paperTotal: 0
				},

				paper: {},
				test: {},
				pillar: {},

				// 用户数据
				user: {},

				// 30天资料,试题数据
				reform: {},
				investigation: {},

				orderData: {
					xAxisData: [], // 横坐标数值
					series: []
				}
			}
		},
		created() {
			// 统计
			this.getCount();

			// 18用户数据
			this.getAddedPayment()
			
			// 30天数据
			this.getThreeDay()
		},
		methods: {

			getThreeDay() {
				Promise.all([rectification(), hiddenCurve()])
					.then(res => {
						this.reform = res[0].data;
						this.investigation = res[1].data;
					})
			},

			getAddedPayment() {
				Promise.all([userCurve()])
					.then(res => {
						this.user = res[0].data;
					})
			},

			getCount() {
				hiddenCount()
				.then(res => {
					this.count.todayHiddenNumber = res.data.todayHiddenNumber;
					this.count.monthHiddenNumber = res.data.monthHiddenNumber;
					this.count.totalHiddenNumber = res.data.totalHiddenNumber;
				})

				rectificationCount()
				.then(res => {
					this.count.todayRectificationNumber = res.data.todayRectificationNumber;
					this.count.monthRectificationNumber = res.data.monthRectificationNumber;
					this.count.totalRectificationNumber = res.data.totalRectificationNumber;
				})

				memberCount()
				.then(res => {
					this.count.todayMemberNumber = res.data.todayMemberNumber;
					this.count.monthMemberNumber = res.data.monthMemberNumber;
					this.count.totalNumber = res.data.totalNumber;
				})
			},
		},
	}
</script>

<style scoped>
	.app-container {
		margin-top: 40px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.address-layout {}

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
