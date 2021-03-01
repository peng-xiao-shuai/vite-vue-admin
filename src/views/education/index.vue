<template>
  <div class="app-container">

	<el-card class="filter-container" :style="{marginBottom: '20px'}" :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
        </div>
        <div>
          <el-button
          style="float:right"
          type="primary"
          @click="getList()"
          size="small">
          查询搜索
        </el-button>
        <!-- <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button> -->
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <div class="screenForm">
             <el-form-item label="资料类型">
			  <el-select v-model="listQuery.type"
                   style="width:100%"
                   placeholder="请选择类型">
				<el-option
					v-for="item in types"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
          </el-form-item>
          </div>
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
			@look="handleShowNextLevel"
			@update="handleUpdate"
			@remove="handleDelete"
		>
		</powerful-table>
		</div>
    </el-card>
	<!-- 编辑区 -->
	<update v-model:dialog="isDialog" v-model:currentFrom='currentFrom.value' :selectMenuList='types'
	@refresh='getList'></update>
  </div>
</template>

<script lang='ts'>
import {
	removeMaterial,
	modifyMaterial,
    listMaterial
} from "/@/api/education/education";
import { header } from "./indexData";
import { ref,reactive,defineComponent,getCurrentInstance } from 'vue';
import { useRouter,useRoute } from 'vue-router';

// 组件
import update from './components/update.vue';

export default defineComponent({
	name:'education',
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
			type: 0
		})

		let types = ref([{
			label: '培训视频',
			value: 0
		},{
			label: '培训PPT',
			value: 1
		},{
			label: '培训教育记录',
			value: 2
		},{
			label: '安全智库',
			value: 3
		}])

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
			listMaterial(listQuery).then((response:any) => {

				list.value = reactive(response.data.list);

				total.value = response.data.total;
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
			removeMaterial(ids).then((response:any) => {
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
			types,

			// 方法
			handleAddMenu,
			handleResetSearch,
			getList,
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
