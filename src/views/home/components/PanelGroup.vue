<template>
	<div style="margin-bottom: 20px">
		<el-row type="flex" justify="space-between" class="panel-group">
			<el-col :span="11" class="card-panel-col">
				<el-popover placement="bottom" trigger="hover">
					<span>今日新增：{{count.todayMemberNumber}}人 <br></span>
					<span>本月新增：{{count.monthMemberNumber}}人 <br></span>
					总用户数：{{count.totalNumber}}人
					<template #reference>
					<div class="card-panel">
						<div class="card-panel-icon-wrapper icon-people">
							<el-image style="width: 60px; height: 60px" :src="user" fit="fit"></el-image>
						</div>
						<div class="card-panel-description">
							<div class="card-panel-text">用户总数</div>
							<div class="card-panel-num">{{count.totalNumber || 0}}</div>
							<!-- <count-to :start-val="0" :end-val="count.totalNumber || 0" :duration="1000" class="card-panel-num" /> -->
						</div>
					</div>
					</template>
				</el-popover>
			</el-col>
			<el-col :span="11" class="card-panel-col">
				<el-popover placement="bottom" trigger="hover">
					<span>今日排查：{{count.todayHiddenNumber}}人 <br></span>
					<span>本月排查：{{count.monthHiddenNumber}}人 <br></span>
					总排查数：{{count.totalHiddenNumber}}人
					<template #reference>
					<div class="card-panel">
						<div class="card-panel-icon-wrapper icon-message">
							<el-image style="width: 60px; height: 60px" :src="order" fit="fit"></el-image>
						</div>
						<div class="card-panel-description">
							<div class="card-panel-text">排查总数</div>
							<div class="card-panel-num">{{count.totalHiddenNumber || 0}}</div>
							<!-- <count-to :start-val="0" :end-val="count.questionNumber || 0" :duration="1000" class="card-panel-num" /> -->
						</div>
					</div>
					</template>
				</el-popover>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import user from '/@/assets/user.png';
	import order from '/@/assets/order.png';
	// import CountTo from 'vue-count-to';

	export default {
		props: {
			count: {
				type: Object,
				default: {}
			}
		},
		components: {
			// CountTo
		},
		data() {
			return {
				user,
				order,
			};
		},
		methods: {
			navTo(type){
				switch(type){
					case 'thisMonthExpeditedPaper':
						this.$router.push({
							name: 'paper'
						})
						break;
				}
			},
			handleSetLineChartData(type) {
				this.$emit('handleSetLineChartData', type);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.panel-group {

		.card-panel {
			height: 108px;
			cursor: pointer;
			font-size: 12px;
			position: relative;
			overflow: hidden;
			color: #666;
			background: #fff;
			border-color: rgba(0, 0, 0, 0.05);

			// &:hover {
			//   .card-panel-icon-wrapper {
			//     color: #fff;
			//   }

			//   .icon-people {
			//     background: #40c9c6;
			//   }

			//   .icon-message {
			//     background: #36a3f7;
			//   }

			//   .icon-money {
			//     background: #f4516c;
			//   }

			//   .icon-shopping {
			//     background: #34bfa3;
			//   }
			// }

			.icon-people {
				color: #40c9c6;
			}

			.icon-message {
				color: #36a3f7;
			}

			.icon-money {
				color: #f4516c;
			}

			.icon-shopping {
				color: #34bfa3;
			}

			.card-panel-icon-wrapper {
				float: left;
				margin: 14px 0 0 14px;
				padding: 16px;
				transition: all 0.38s ease-out;
				border-radius: 6px;
			}

			.card-panel-icon {
				float: left;
				font-size: 48px;
			}

			.card-panel-description {
				text-align: right;
				float: right;
				font-weight: bold;
				margin: 26px;
				margin-left: 0px;

				.card-panel-text {
					line-height: 18px;
					color: rgba(0, 0, 0, 0.45);
					font-size: 16px;
					margin-bottom: 12px;
				}

				.card-panel-num {
					color: #666;
					font-size: 20px;
				}
			}
		}
	}

	@media (max-width: 550px) {
		.card-panel-description {
			display: none;
		}

		.card-panel-icon-wrapper {
			float: none !important;
			width: 100%;
			height: 100%;
			margin: 0 !important;

			.svg-icon {
				display: block;
				margin: 14px auto !important;
				float: none !important;
			}
		}
	}
</style>
