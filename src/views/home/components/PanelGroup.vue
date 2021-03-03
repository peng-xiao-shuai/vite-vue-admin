<template>
	<div style="margin-bottom: 20px">
		<div class="grid">
			<!-- {{count}} -->
			<div v-for="(i,n) in count" :key='i.value' :class="['card-panel','item'+n]"
			:style="{background: i.color}">
				<div :class="['icon-people','viteIcon',i.icon]"></div>
				<div class="warp">
					<div class="text">{{i.title}}</div>
					<div class="num">{{i.value || 0}}</div>
					<!-- <count-to :start-val="0" :end-val="count.totalNumber || 0" :duration="1000" class="card-panel-num" /> -->
				</div>
			</div>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

	export default defineComponent({
		props: {
			count: {
				type: Object,
				default: {}
			}
		},
		components: {
			// CountTo
		},
	})
</script>

<style lang="scss" scoped>

	.viteIcon{
		font-size: 60px;
		color: #fff;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(4,1fr);
		grid-column-gap: 20px;

		.card-panel {
			padding: 10px;
			font-size: 16px;
			overflow: hidden;
			display: flex;
			border-radius: 5px;
			justify-content: space-between;
			align-items: center;

			.warp{
				min-width: 100px;
				text-align: center;
				color: #fff;

				.text {
					line-height: 18px;
					font-size: 16px;
					margin-bottom: 12px;
				}
				.num {
					font-size: 20px;
				}
			}
		}
	}
</style>
