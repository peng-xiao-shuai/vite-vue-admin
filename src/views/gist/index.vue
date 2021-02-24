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
          <el-form-item label="标题：">
       		<el-input v-model="currentFrom.title" style="width:80%" clearable ></el-input>
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

		<div>
			<el-button type="primary" class="btn-add" @click="handleAddMenu()" size="mini">
				添加
			</el-button>
		</div>
	  </div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow">
		<div>
		<powerful-table
			ref="menuTable"
			:list="list.value"
			:header="config"
			:isSelect="true"
			:total="total"
			:tableName="'menuTable'"
            :operateData='operateData'
			@batchOperate='handleBatchChange'
			@sizeChange="getList"
			@update="handleUpdate"
			@remove="handleDelete"
		>
		</powerful-table>
		</div>
    </el-card>
	<!-- 编辑区 -->
	<update v-model:dialog="isDialog" v-model:currentFrom='currentFrom.value'
	@refresh='getList'></update>
  </div>
</template>

<script lang='ts'>
import {
	listInvestigationBasis,
	modifyInvestigationBasis,
    removeInvestigationBasis
} from "/@/api/gist/gist";
import { header } from "./indexData.ts";
import { ref,reactive,defineComponent,getCurrentInstance } from 'vue';
import { useRouter,useRoute } from 'vue-router';

// 组件
import update from './components/update.vue';

export default defineComponent({
	name:'gist',
	components:{
		update
	},
	setup(){
		const _this = getCurrentInstance().ctx
		const router = useRouter()
		const route = useRoute()

		let list = reactive({value: []})
		let allList = reactive({value: [{id: 0, title: '无上级菜单'}]})

        // 批量操作
        let operateData = {
            value: 0,
            operates:[{
                label: '删除',
                value: 0
            }]
        }

      	let total = ref(0)
      	let config = reactive(header)
      	let listQuery = reactive({
			pageNum: 1,
			pageSize: 10,
			title: ''
		})

      	let parentId = ref(0)
      	let upParentId = ref(-1)

		// 编辑区显隐
		let isDialog = ref(false)
		// 编辑区当前数据
		let currentFrom =  reactive({value:{parentId: 0,hidden: 0}})

		getList();

		function handleResetSearch(){
			listQuery = listQuery
		}

		function handleAddMenu() {
			isDialog.value = true
		}
		function getList(e?:{pageSize:number,pageNum:number}) {
			Object.assign(listQuery,e ? e : {})
			listInvestigationBasis(listQuery).then((response:any) => {

				list.value = reactive(response.data.list);

				total.value = response.data.total;
			});
		}
		function handleSwitchChange(row:any, index:number) {
		  modifyInvestigationBasis(row.id, { hidden: row.hidden }).then((response:any) => {
		    _this.$message({
		      message: "修改成功",
		      type: "success",
		      duration: 1000,
		    });
		  });
		}
		function handleShowNextLevel(row:any, index:number) {
			upParentId.value = parentId.value

			parentId.value = row.id
			
			getList();
		}
		function handleUpdate(row:any, index:number) {
			isDialog.value = true
			
			currentFrom.value = reactive(JSON.parse(JSON.stringify(row)))
		}

		function handleBatchChange(ids:any,item:object,index:number){
			delect(ids)
		}

		function handleDelete(row:any, index:number) {
			delect([row.id])
		}

		function delect(ids:any){
			removeInvestigationBasis(ids).then((response:any) => {
                _this.$message({
                    message: "删除成功",
                    type: "success",
                    duration: 1000,
                });
				getList();
			});
		}

		return {
			// 变量
			list,
			total,
			config,
            operateData,
			listQuery,
			parentId,
			upParentId,
			isDialog,
			currentFrom,
			allList,

			// 方法
			handleAddMenu,
			handleResetSearch,
			getList,
			handleSwitchChange,
			handleBatchChange,
			handleShowNextLevel,
			handleUpdate,
			handleDelete,
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
