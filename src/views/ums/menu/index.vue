<template>
  <div class="app-container">
    <el-card :style="{marginBottom: '20px'}" :shadow="defalutData.cardShadow">
      <div class="operate-container">
		  <div>
			<i class="el-icon-tickets"></i>
			<span>数据列表</span>
		</div>

		<div>
			<transition name="fadeOpticy">
				<el-button type="primary" class="btn-add" @click="backUp()" size="mini" v-show="upParentId >= 0">
					<i class="el-icon-back"></i>返回上级
				</el-button>
			</transition>
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
			:isSelect="false"
			:total="total"
			:tableName="'menuTable'"
			@sizeChange="getList"
			@switchChange="handleHiddenChange"
			@look="handleShowNextLevel"
			@update="handleUpdate"
			@remove="handleDelete"
		>
		</powerful-table>
		</div>
    </el-card>
	<!-- 编辑区 -->
	<update v-model:dialog="isDialog" v-model:currentFrom='currentFrom.value' :selectMenuList='allList.value'
	@refresh='getList'></update>
  </div>
</template>

<script>
import {
  fetchList,
  deleteMenu,
  updateMenu,
  updateHidden,
} from "/@/api/ums/menu";
import { header } from "./indexData.ts";
import { ref,reactive,defineComponent, watch,getCurrentInstance, computed } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import store from '/@/store';

// 组件
import update from './components/update.vue';

export default defineComponent({
	name:'menu',
	components:{
		update
	},
	setup(){
		const _this = getCurrentInstance().ctx
		const router = useRouter()
		const route = useRoute()

		let list = reactive({value: []})
		let allList = reactive({value: [{id: 0, title: '无上级菜单'}]})

      	let total = ref(0)
      	let config = reactive(header)
      	let listQuery = reactive({
			pageNum: 1,
			pageSize: 10,
		})

      	let parentId = ref(0)
      	let upParentId = ref(-1)

		// 编辑区显隐
		let isDialog = ref(false)
		// 编辑区当前数据
		let currentFrom =  reactive({value:{parentId: 0,hidden: 0}})

		getList();

		function handleAddMenu() {
			isDialog.value = true
		}
		function getList(e) {
			if(parentId.value == 0){
				upParentId.value = -1
			}

			Object.assign(listQuery,e ? e : {pageNum: 1,pageSize: 10})
			fetchList(parentId.value, listQuery).then((response) => {

				list.value = reactive(response.data.list);

				total.value = response.data.total;
			});
		}
		function handleHiddenChange(row, index) {
		  updateHidden(row.id, { hidden: row.hidden }).then((response) => {
		    _this.$message({
		      message: "修改成功",
		      type: "success",
		      duration: 1000,
		    });
		  });
		}
		function handleShowNextLevel(row, index) {
			upParentId.value = parentId.value

			parentId.value = row.id
			
			getList();
		}
		function backUp(){
			listQuery.pageNum = 1
			parentId.value = upParentId.value

			getList();
		}
		function handleUpdate(row, index) {
			isDialog.value = true
			
			currentFrom.value = reactive(JSON.parse(JSON.stringify(row)))

			console.log(currentFrom);
		}
		function handleDelete(row, index) {
			deleteMenu(row.id).then((response) => {
			_this.$message({
				message: "删除成功",
				type: "success",
				duration: 1000,
			});
				getList();
			});
		}
		// 获取所有的菜单
		fetchList(parentId.value, {pageSize:0,pageNum:0}).then((response) => {
			allList.value = allList.value.concat(response.data.list)

			getList();
		});

		return {
			// 变量
			list,
			total,
			config,
			listQuery,
			parentId,
			upParentId,
			isDialog,
			currentFrom,
			allList,

			// 方法
			handleAddMenu,
			getList,
			backUp,
			handleHiddenChange,
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
