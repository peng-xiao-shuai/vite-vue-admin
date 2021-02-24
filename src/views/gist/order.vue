<template>
  <div class="app-container">

	<el-card class="filter-container" :style="{marginBottom: '20px'}" :shadow="defalutData.cardShadow">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="getList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="企业名称：">
       		<el-input v-model="listQuery.name" style="width:80%" clearable ></el-input>

			  <!-- <el-select v-model="listQuery.type"
                   style="width:100%"
                   placeholder="请选择类型">
				<el-option
					v-for="item in types"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select> -->
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card :style="{marginBottom: '20px'}" :shadow="defalutData.cardShadow">
      <div class="operate-container">
		  <div>
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
		</div>
	  </div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow">
		<div>
		<powerful-table
			ref="menuTable"
			:list="list.value"
			:header="config"
			:total="total"
			:tableName="'menuTable'"
			@sizeChange="getList"
		>
		</powerful-table>
		</div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import {
	listInvestigationOrder,
} from "/@/api/gist/gist";

import { orderHeader } from './indexData';

import { ref,reactive,defineComponent,getCurrentInstance } from 'vue';
import { useRouter,useRoute } from 'vue-router';

export default defineComponent({
	name:'gistOrder',
	setup(){
		const _this = getCurrentInstance().ctx
		const router = useRouter()
		const route = useRoute()

		let list = reactive({value: []})

      	let total = ref(0)
      	let config = reactive(orderHeader)
      	let listQuery = reactive({
			pageNum: 1,
			pageSize: 10,
			name: ''
		})

      	let parentId = ref(0)
      	let upParentId = ref(-1)

		// 编辑区显隐
		let isDialog = ref(false)
		// 编辑区当前数据
		let currentFrom =  reactive({value:{}})

		getList();

		function handleResetSearch(){
			listQuery = listQuery
		}

		function handleAddMenu() {
			isDialog.value = true
		}
		function getList(e?:{pageSize:number,pageNum:number}) {
			Object.assign(listQuery,e ? e : {})
			listInvestigationOrder(listQuery).then((response:any) => {

				list.value = reactive(response.data.list);

				total.value = response.data.total;
			});
		}

		return {
			// 变量
			list,
			total,
			config,
			listQuery,

			// 方法
			getList,
		}
	}
});
</script>

<style scoped>
.operate-container{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
