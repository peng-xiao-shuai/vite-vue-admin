<template>
	<div class="app-container">
		<el-card class="filter-container" :style="{ marginBottom: '20px' }" :shadow="defaultData.cardShadow">
			<div class="operate-container">
				<div>
					<i class="el-icon-search"></i>
					<span>筛选搜索</span>
				</div>
				<div>
					<el-button style="float: right" type="primary" @click="getList()">
						查询搜索
					</el-button>
					<el-button style="float: right; margin-right: 15px" @click="handleResetSearch()">
						重置
					</el-button>
				</div>
			</div>
			<div style="margin-top: 15px">
				<el-form :inline="true" :model="powerfulTabledata.listQuery">
					<div class="screenForm">
						<el-form-item label="书名：">
							<el-input v-model="powerfulTabledata.listQuery.name" placeholder="请输入书名" style="width: 80%"
								clearable></el-input>
						</el-form-item>
						<el-form-item label="书类型：" prop="types">
							<el-select v-model="powerfulTabledata.listQuery.types" placeholder="请选择">
								<el-option v-for="item in selectMenuList" :key="item.value" :label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
					</div>
				</el-form>
			</div>
		</el-card>

		<el-card :shadow="defaultData.cardShadow">
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
			<div>
				<powerful-table ref="Table" :list="powerfulTabledata.list" :header="powerfulTabledata.header"
					:isSelect="true" :total="powerfulTabledata.total" :tableName="'Table'" :operateData="operateData"
					:selectData="selectData.value" @batchOperate="handleBatchChange" @sizeChange="getList"
					@switchChange="handleSwitchChange" @update="handleUpdate" @remove="handleDelete"
					@sortCustom="handleSortCustom">
				</powerful-table>
			</div>
		</el-card>
		<!-- 编辑区 -->
		<update v-model:dialog="isDialog" v-model:currentForm="currentForm.value" :selectMenuList="selectMenuList"
			@refresh="refresh"></update>
	</div>
</template>

<script lang='ts'>
	import {
		tableFun,
		bookListsDelete
	} from "@/api/modules/table";
	import {
		header
	} from "./indexData";
	import {
		ref,
		reactive,
		defineComponent,
		shallowReactive
	} from "vue";

	// 组件
	import update from "./components/update.vue";
	import { ElMessage } from 'element-plus';

	export default defineComponent({
		name: "modulesTable",
		components: {
			update,
		},
		setup() {
			let selectData = shallowReactive({
				value: []
			});

			let selectMenuList = shallowReactive([{
					value: 0,
					label: "玄幻"
				},
				{
					value: 1,
					label: "都市"
				},
				{
					value: 2,
					label: "真实"
				},
			]);
			// 批量操作
			let operateData = {
				value: 0,
				operates: [{
						label: "推荐",
						value: 0,
					},
					{
						label: "取消推荐",
						value: 1,
					},
					{
						label: "删除",
						value: 2,
					},
				],
			};

			interface powerfultable {
				listQuery: query;
				total: number;
				header: any[];
				list: any[];
			}

			interface query {
				pageNum: number;
				pageSize: number;
				types: string;
				name: string;
				[propName: string]: string | number;
			}

			const powerfulTabledata = reactive < powerfultable > ({
				listQuery: {
					pageNum: 1,
					pageSize: 10,
					types: "",
					name: "",
				},
				header: header,
				total: 0,
				list: [],
			});

			// 编辑区显隐
			let isDialog = ref(false);
			// 编辑区当前数据
			let currentForm = reactive({
				value: {}
			});

			const handleAddMenu = () => {
				isDialog.value = true;
			};
			const getList = (
				e ? : {
					pageNum: number | string;
					pageSize: number | string;
				},
				selectArr ? : any
			) => {
				// 获取选中
				selectData.value = selectArr ? selectArr : [];

				Object.assign(powerfulTabledata.listQuery, e ? e : {});
				tableFun(powerfulTabledata.listQuery).then((response) => {
					powerfulTabledata.list = response.data.list;
					powerfulTabledata.total = response.data.total;
				});
			};
			getList();

			const handleSortCustom = (e: any) => {
				console.log("远程搜索", e);
				powerfulTabledata.listQuery[e.prop] = e.order;
				getList();
			};
			const handleSwitchChange = (row: any, index: number) => {
				powerfulTabledata.list[index] = row;
				ElMessage.success("修改成功");
			};
			const handleUpdate = (row: any, index: number) => {
				isDialog.value = true;

				currentForm.value = reactive(JSON.parse(JSON.stringify(row)));
			};

			const handleBatchChange = ({
				ids,
				item
			}: {
				ids: number[],
				item: {label: string, value: number}
			}) => {
				switch (item.value) {
					case 0:
					case 1:
						powerfulTabledata.list.forEach((each: any, index: number) => {
							if (ids.indexOf(each.id) !== -1) {
								if (item.value === 0) {
									each.recommend = 1;
								} else {
									each.recommend = 0;
								}
							}
						});
						ElMessage.success("修改成功");

						break;
					case 2:
						_delete(ids);
						break;
				}
			};

			const handleDelete = ({row, index}: {row: any, index: number}) => {
				_delete([row.id]);	
			};

			const _delete = (ids: number[]) => {
				bookListsDelete(ids)
				.then(() =>{
					ElMessage.success("删除成功");
					getList()
				})

			};

			const handleResetSearch = () => {
				Object.keys(powerfulTabledata.listQuery).forEach(
					(item: any, index: number) => {
						let arr = ["pageNum", "pageSize"];
						if (arr.indexOf(item) == -1) {
							powerfulTabledata.listQuery[item] = "";
						}
					}
				);
			};

			const refresh = (from: any) => {
				console.log(from, "refresh");
				// 添加修改
				if (from.id) {
					let index = powerfulTabledata.list
						.map((item: any) => item.id)
						.indexOf(from.id);
					powerfulTabledata.list[index] = from;
				} else {
					powerfulTabledata.list.push({
						...from,
						id: powerfulTabledata.list[powerfulTabledata.list.length - 1].id + 1,
						iconfont: "vitehome-liulanliang",
						href: "https://gitee.com/abc1612565136/vite-admin",
					});
					console.log(powerfulTabledata.list);
				}
			};

			return {
				// 变量
				operateData,
				isDialog,
				currentForm,
				selectData,
				selectMenuList,
				powerfulTabledata,

				// 方法
				handleResetSearch,
				handleAddMenu,
				refresh,
				getList,
				handleSwitchChange,
				handleBatchChange,
				handleUpdate,
				handleDelete,
				handleSortCustom,
			};
		},
	});
</script>

<style scoped>
	.operate-container {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
