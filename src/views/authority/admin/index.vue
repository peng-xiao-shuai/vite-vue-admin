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
				<el-form :inline="true" :model="powerfulTableData.listQuery">
					<div class="screenForm">
						<el-form-item label="名称：">
							<el-input v-model="powerfulTableData.listQuery.username" placeholder="请输入账号名" style="width: 80%"
								clearable></el-input>
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

				<!-- <div>
					<el-button type="primary" class="btn-add">
						添加
					</el-button>
				</div> -->
			</div>

      <div>
        <powerful-table
          ref="menuTable"
          :list="powerfulTableData.list"
          :header="powerfulTableData.header"
          :isSelect="false"
          :total="powerfulTableData.total"
          :tableName="'menuTable'"
          @sizeChange="getList"
          @switchChange="handleStatusChange"
          @occupyOne="({row}) => {switchs.role = true; currentForm = JSON.parse(JSON.stringify(row))}"
          @remove="remove"
        >
          <template #roles={row}>
            <el-tag v-for="item in row.roles" :key='item' style="margin-right: 5px">
              {{roleLists.filter((i) => i.value == item)[0]?.label}}
            </el-tag>
          </template>
        </powerful-table>
      </div>
    </el-card>

    <el-dialog title="分配角色" v-model="switchs.role" width="30%">
      <el-select
        v-model="currentForm.roles"
        multiple
        placeholder="请选择"
        style="width: 80%"
      >
        <el-option
          v-for="item in roleLists"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <template #footer class="dialog-footer">
        <el-button @click="switchs.role = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRole()"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getUserList, userRemove } from '@/api/logins'
import { getRoleList } from '@/api/ums/role';
import { reactive, ref, getCurrentInstance } from 'vue'
import { header, RowType } from './indexData'
import { useStore } from 'vuex';

const store = useStore()
const { proxy } = getCurrentInstance() as any

// 弹窗开关
const switchs = reactive({
  role: false,
  edit: false
})

// row 数据
const currentForm = ref<RowType|{}>({})

type PowerfulTableData = {
  list: RowType[],
  header: any[],
  total: number,
  listQuery: {
    pageNum: number,
    pageSize: number,
    username?: string
  }
}
const powerfulTableData = reactive<PowerfulTableData>({
  list: [],
  header: header,
  total: 0,
  listQuery: {
    pageNum: 1,
    pageSize: 10,
    username: ''
  }
})

// 角色列表
const roleLists = ref<{label: string, value: string}[]>([])

// 获取用户列表
const getList = () => {
  getUserList(powerfulTableData.listQuery)
  .then(res => {
    powerfulTableData.list = res.data.list
    powerfulTableData.total = res.data.total
  })
}

// 获取角色列表
const getRole = () => {
  getRoleList({ pageNum: 1, pageSize: 100 })
  .then(res => {
    roleLists.value = res.data.list
  })
}

getRole()
getList()

const remove = ({row}: {row: RowType}) => {
  userRemove({ids: [row.id]})
  .then(res => {
    proxy.$message.success('删除成功！')
    getList()
  })
}

// 停用事件
const handleStatusChange = (e: RowType) => {
  if (store.state.user.userInfo.id == e.id && e.status === 0) {
    proxy.$message.error('你的账号已被停用！')
  }
}

// 分配菜单
const handleAddRole = () => {
  switchs.role = false
  powerfulTableData.list = powerfulTableData.list.map((item:RowType) => {
    if (item.id == (currentForm.value as RowType).id) {
      item = currentForm.value as RowType
    }

    return item
  })
}

// 重置
const handleResetSearch = () => {
  Object.keys(powerfulTableData.listQuery).forEach(
    (item: any) => {
      let arr = ["pageNum", "pageSize"];
      if (arr.indexOf(item) == -1) {
        (powerfulTableData.listQuery as {[s:string]: string|number})[item] = "";
      }
    }
  );
};
</script>