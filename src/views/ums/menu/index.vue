<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="handleAddMenu()" size="mini">
        添加
      </el-button>
    </el-card>

    <div class="table-container">
      <powerful-table
        ref="menuTable"
        :list="list.value"
        :header="config"
        :isSelect="false"
        :total="total"
        @sizeChange="getList"
        @switchChange="handleHiddenChange"
        @look="handleShowNextLevel"
        @update="handleUpdate"
        @remove="handleDelete"
      >
      </powerful-table>
    </div>

	<!-- 编辑区 -->
	<update v-model:dialog="isDialog" v-model:currentFrom='currentFrom.value'></update>
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
import { ref,reactive,defineComponent, watch } from 'vue';
import { useRouter,useRoute } from 'vue-router';

// 组件
import update from './components/update.vue';

export default defineComponent({
	components:{
		update
	},
	setup(){
		let list = reactive({value: []})

      	let total = ref(0)
      	let config = reactive(header)
      	let listQuery = reactive({
			pageNum: 1,
			pageSize: 10,
		})
      	let parentId = ref(0)

		// 编辑区显隐
		let isDialog = ref(false)
		// 编辑区当前数据
		let currentFrom =  reactive({value:{}})

		const router = useRouter()
		const route = useRoute()

		watch(route,()=>{
			resetParentId()
			getList()
		},{
			immediate:true
		})

		function resetParentId() {
			listQuery.pageNum = 1;
			if (route.query.parentId != null) {
				parentId = route.query.parentId;
			} else {
				parentId = 0;
			}
		}
		function handleAddMenu() {
			isDialog.value = true
		}
		function getList(e) {

			Object.assign(listQuery,e ? e : {pageNum: 1,pageSize: 10})

			fetchList(parentId, listQuery).then((response) => {

				list.value = reactive(response.data.list);

				console.log(list);
				total.value = response.data.total;
			});
		}
		function handleHiddenChange(index, row) {
		//   updateHidden(row.id, { hidden: row.hidden }).then((response) => {
		//     this.$message({
		//       message: "修改成功",
		//       type: "success",
		//       duration: 1000,
		//     });
		//   });
		}
		function handleShowNextLevel(index, row) {
			router.push({ path: "/ums/menu", query: { parentId: row.id } });
		}
		function handleUpdate(row, index) {
			isDialog.value = true
			
			currentFrom.value = reactive(JSON.parse(JSON.stringify(row)))

			console.log(currentFrom);
		}
		function handleDelete(index, row) {
			this.$confirm("是否要删除该菜单", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				deleteMenu(row.id).then((response) => {
				this.$message({
					message: "删除成功",
					type: "success",
					duration: 1000,
				});
					getList();
				});
			});

		}

		return {
			// 变量
			list,
			total,
			config,
			listQuery,
			parentId,
			isDialog,
			currentFrom,

			// 方法
			handleAddMenu,
			getList,
			handleHiddenChange,
			handleShowNextLevel,
			handleUpdate,
			handleDelete
		}
	}
});
</script>

<style scoped>
</style>
