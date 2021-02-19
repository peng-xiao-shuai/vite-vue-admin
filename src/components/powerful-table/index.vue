<template>
	<div>
		<el-table v-loading="listLoading" :data="list" ref='multipleTable' element-loading-text="Loading" border fit
		 highlight-current-row @selection-change="handleSelectionChange" @sort-change='sortChange'>
			<el-table-column v-if="isSelect" align="center" type="selection" width="45">
			</el-table-column>

			<el-table-column v-for="(item,index) in header" :key='index' :fixed='item.fixed || false' :sortable='item.sortable || false'
			:header-align="item.headerAlign || 'center'" :show-overflow-tooltip="item.overflowTooltip || false"
			 align="center" :prop="item.poprs[0].child || item.poprs[0].popr" :label="item.label" :min-width="item.minWidth || 100" :width="item.width || ''">
				<template #default="scope">
					<div v-for="(each,idx) in item.poprs" :key='idx' :style="each.style || {}">
						<!-- 筛选 -->
						<div v-if="each.filter">
							{{filterFun(scope.row[each.popr],each.filter)}}
						</div>
						<!-- 图片 -->
						<div v-else-if="each.type == 'image'">
							<el-image :src='scope.row[each.popr]' :preview-src-list="each.data.preview ? [scope.row[each.popr]] : []"
							 :lazy='each.data.lazy || false' :z-index="each.data.zIndex || 2000" :style='each.data.style || {}'
							 :fit="each.data.fit || 'cover'"></el-image>
						</div>
						<!-- 按钮 -->
						<div v-else-if="each.type == 'btn'">
							<el-tooltip class="each" effect="dark" :content="apiece.tip" placement="top" v-for="(apiece,idx) in each.data" :key='idx'>
								<el-button v-if='apiece.condi ? scope.row[apiece.condi.popr] == apiece.condi.value : true'
								:style="apiece.style || {}" :icon="apiece.icon || ''" :disabled="apiece.disabled || false" :type="apiece.type || 'primary'"
								 :size="apiece.size || 'small'" @click='btnChange(apiece.emit,scope.row,scope.$index,apiece.type)'></el-button>
								
							</el-tooltip>
						</div>
						<!-- 开关 -->
						<div v-else-if="each.type == 'switch'">
							<el-switch :inactive-text="each.data.inactiveText || ''" :active-text="each.data.activeText || ''" v-model="scope.row[each.popr]" :disabled="each.data.disabled || false" :active-color="each.data.activeColor || '#409EFF'" :inactive-color="each.data.inactiveColor || '#C0CCDA'"
							 :active-value="(each.data.activeValue || each.data.activeValue === 0) ? each.data.activeValue : 1 " :inactive-value="each.data.inactiveValue || 0" @click="switchChange(scope.row,each.popr,each.data.activeValue,each.data.inactiveValue)">
							</el-switch>
						</div>
						<!-- 输入框 -->
						<div v-else-if="each.type == 'input'">
							<el-input :style="each.data.style || {}" :size="each.data.size || 'small'" :placeholder="each.data.placeholder || ''" v-model="scope.row[each.popr]" :disabled="each.data.disabled || false">
							    <template style="padding: 0 10px" v-if="each.data.slot" v-slot:[each.data.slot]>{{each.data.symbol}}</template>
							</el-input>
						</div>
						<div v-else-if="each.type == 'iconfont'">
							<i :class="[scope.row[each.popr],...each.data.class] || ['']" :style="each.data.style || {}"></i>
						</div>
						<div v-else-if="each.type == 'video'" style="border-radius: 10px;overflow: hidden;width: 100%;height: 100%;margin: 0 auto;">
						  <video
							v-if="scope.row[each.popr]"
						    :src="scope.row[each.popr]"
						    :poster="each.data.poster || ''"
							:loop="each.data.loop || false"
						    :style="each.data.style || {}"
						    class="avatar video-avatar"
						    controls="controls"
  						  >
						    您的浏览器不支持视频播放
						  </video>
						  
						  <div v-else style="display: flex;align-items: center;height: 100%;width: 100%;justify-content: center;">暂无视频</div>
						</div>
						<!-- 正常 -->
						<div v-else>
							<div>
								{{each.child ? scope.row[each.popr][each.child] : scope.row[each.popr]}}
							</div>
						</div>
										
					</div>
				</template>
			</el-table-column>
		</el-table>

		<div style="display: flex;justify-content: space-between;">
			<div class="pagination left" v-if="operateData && operateData.operates.length > 0">
				<el-select v-model="operateData.value" clearable placeholder="批量操作" :size="operateData.size || 'small'">
					<el-option v-for="(item,index) in operateData.operates" :key="index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-button :style="operateData.style || {marginLeft: '20px'}" :icon="operateData.icon || ''" :type="operateData.type || 'primary'" :size="operateData.size || 'small '"
				class="search-button" @click="batchOperate">
					确定
				</el-button>
			</div>

			<div class="pagination">
				<el-pagination @size-change="handleChange($event,'pageSize')" @current-change="handleChange($event,'currentPage')"
				 :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :layout="layout" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	import { ElMessage } from 'element-plus'
	import store from '/@/store';

	export default {
		name: "powerful-table",
		props: {
			// 当前数据
			list: {
				type: Array,
				default: () => []
			},

			// 所有选中
			selectData: {
				type: Array,
				default: () => []
			},
			isSelect: {
				type: Boolean,
				default: false
			},
			selectCompare:{
				type: Array,
				default: () => ['id','id']
			},

			header: {
				type: Array,
				default: () => []
			},

			// 分页数据
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next'
			},
			pageSizes: {
				type: Array,
				default: () => [5, 20, 30]
			},

			// 批量操作
			operateData: {
				type: Object,
				default: ()=>{
					// null
				}
			},
			// 表格名
			tableName:{
				type: String,
				default: '_num'
			},
			// 是否开启表格pageNum缓存
			isCachePageNum:{
				type: Boolean,
				default: false
			},

			//  毕传
			total: {
				type: Number,
				default: 0
			},
		},
		emits:['update:currentPage','sortCustom','batchOperate','switchChange','sizeChange','look','update','remove'],
		data() {
			return {
				listLoading: true,

				// 分页
				currentPage: 1,

				// 当前页选中
				currentSelect: [],
				// 其他页面选中
				otherSelect: [],
				
				pageSize: this.pageSizes[0],
			}
		},
		computed:{
			// 筛选是否存在pageNum
			page(){
				if(this.isCachePageNum){
					return store.state.pageNum.pageNums.filter((item) =>{
						return item && item.name == this.$route.name
					})
				}else{
					return []
				}
			}
		},
		mounted(){
			if(this.isCachePageNum){
				this.currentPage = this.page.length > 0 && this.page[0].pages[this.tableName] || 1
			}
		},
		methods: {
			// 筛选
			filterFun(e,row){
				let val

				for (let i in row) {
					val = e == row[i].key ? row[i].value : e
					if(e == row[i].key){
						val = row[i].value
						
						break;
					}else{
						val = e
					}
					
				}
				return val
			},
			// 排序方法
			sortChange(obj){
				if(obj.column){
					if(obj.column.sortable == 'custom'){
						this.$emit('sortCustom',obj)
					}
				}
			},

			// 批量按钮
			batchOperate() {
				console.log(this.operateData.value);
				if (!this.operateData.value && this.operateData.value != '0') {
					ElMessage({
						message: '请选择操作类型',
						type: 'warning',
						duration: 1000
					});
					return;
				}

				if (this.currentSelect.length == 0) {
					ElMessage({
						message: '请选择要操作的商品',
						type: 'warning',
						duration: 1000
					});
					return;
				}
				this.$confirm(`是否要进行批量${this.operateData.operates[this.operateData.value].label}操作?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let ids = this.otherSelect.concat(this.currentSelect).map(item => item.id)
					let items = this.otherSelect.concat(this.currentSelect).map(item => item)
					
					this.$emit('batchOperate',ids,this.operateData.operates[this.operateData.value],items)
				})
				.catch(err =>{
					console.log('取消批量操作');
				})

			},
			// 按钮回调
			btnChange(emit, row, index, type) {
				if (type == 'danger') {
					this.$confirm('是否要进行删除操作, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						})
						.then(res => {
							this.$emit(emit, row, index)
						})
						.catch(err => {
							console.log('取消删除');
						})
				} else {
					this.$emit(emit, row, index)
				}
			},
			// 开关回调
			switchChange(row, popr, val = 1, val2 = 0) {
				let value = row[popr] == val ? val2 : val
				this.$confirm('是否要进行修改操作, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(res => {
					this.$emit('switchChange', row)
				})
				.catch(err => {
					row[popr] = value
				})
			},
			// 获取选中
			getSelect(arr) {
				
				// 1.获取当前页
				// 2.总选中减去当前页
				// 3.得到其他页
				
				// 所有选中
				let all = arr
				// 获取当前页选中
				let current = []
				// 获取 其他页选中
				let other = []
						
				// 获取当前页
				if (all.length != 0) {
					// console.log('所有选中', all);
					// 获取当前页
					arr.forEach((item, index) => {
						let itm = this.list.filter((each,index) =>{
							return item[this.selectCompare[0]] == each[this.selectCompare[1]]
						})
						
						if(itm.length > 0){
							current.push(itm[0])
						}
					})

					// this.currentSelect = current
					// console.log('当前页选中', current);
					// 获取其他页
					if(current.length > 0){
						other = JSON.parse(JSON.stringify(arr))
						for(let j in other){
							current.forEach((item,i) => {
								if(item[this.selectCompare[1]] == other[j][this.selectCompare[0]]){
									other.splice(j,1)
								}
							})
						}
					}else{
						other = JSON.parse(JSON.stringify(arr))
					}

					this.otherSelect = other
					// console.log('其他页选中', this.otherSelect);

					if (current.length != 0) {
						current.forEach((row,index) => {
							this.$refs.multipleTable.toggleRowSelection(row);
						});

					} else {
						this.$refs.multipleTable.clearSelection();
					}
				}
			},

			// 添加选中
			handleSelectionChange(e) {
				// console.log('选中',e);
				this.currentSelect = JSON.parse(JSON.stringify(e))
			},

			handleChange(e, type) {
				// console.log('切换', e, type);

				this[type] = e

				this.get()
			},

			get() {
				// 存储pageNum
				if(this.isCachePageNum){

					if(this.page.length <= 0){
						store.commit('pageNumPush',{name: this.$route.name,pages:{[this.tableName]: this.currentPage}})
					}else{
						this.page[0].pages[this.tableName] = this.currentPage
					}
				}

				let data = {
					pageNum: this.currentPage,
					pageSize: this.pageSize
				}

				try {
					// 如果父组件是getList方法 无需自定义事假
					this.$parent._getList(data, this.otherSelect.concat(this.currentSelect))
				} catch (error) {
					this.$emit('sizeChange', data, this.otherSelect.concat(this.currentSelect))
				}
			}
		},
		watch: {
			// list数据有的话 关闭加载中...
			list:{
				handler(val) {
					console.log('数据',val);
					this.listLoading = false
					this.$nextTick(()=>{
						// setTimeout(()=>{
							this.getSelect(this.selectData)
						// },100)
					})
				},

				immediate: true
			}
		}
	}
</script>

<style lang='scss'>
	.pagination {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		padding-top: 20px;
	}

	.left {
		justify-content: flex-start;
	}

	.el-pagination {
		width: auto;
	}
</style>
