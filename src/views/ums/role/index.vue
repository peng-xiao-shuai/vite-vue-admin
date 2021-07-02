<template>
  <div class="app-container">
    <el-card
      class="filter-container"
      :style="{ marginBottom: '20px' }"
      :shadow="defaultData.cardShadow"
    >
      <div class="operate-container">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button style="float: right" type="primary" @click="getList()">
            查询搜索
          </el-button>
          <el-button
            style="float: right; margin-right: 15px"
            @click="handleResetSearch()"
          >
            重置
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery">
          <div class="screenForm">
            <el-form-item label="角色名：">
              <el-input
                v-model="listQuery.keyword"
                placeholder="角色名称"
                clearable
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card :style="{ marginBottom: '20px' }" :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
        </div>

        <div>
          <el-button
            type="primary"
            class="btn-add"
            @click="handleAdd()"
            size="mini"
          >
            添加
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card :shadow="defaultData.cardShadow">
      <div>
        <powerful-table
          ref="menuTable"
          :list="list"
          :header="config"
          :isSelect="false"
          :total="total"
          :tableName="'table'"
          @sizeChange="getList"
          @switchChange="handleStatusChange"
          @occupyOne="handleSelectMenu"
          @occupyTwo="handleSelectResource"
          @update="handleUpdate"
          @remove="handleDelete"
        >
        </powerful-table>
      </div>
    </el-card>

    <!-- 编辑区 -->
    <el-drawer
      :title="isEdit ? '修改' : '添加'"
      v-model="dialogVisible"
      direction="rtl"
      ref="drawer"
    >
      <el-form :model="role" ref="roleForm" label-width="150px">
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input
            v-model="role.description"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.status" v-if="dialogVisible">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="role.status">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm()"
              >确 定</el-button
            >
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { fetchList, createRole, updateRole, updateStatus, deleteRole } from '@/api/ums/role'
import { header } from './indexData'
// import {formatDate} from '@/utils/parse-time';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
}
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1
}
export default {
  data () {
    return {
      config: header,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      role: Object.assign({}, defaultRole),
      isEdit: false
    }
  },
  created () {
    this.getList()
  },
  filters: {
    formatDateTime (time) {
      if (time == null || time === '') {
        return 'N/A'
      }
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    handleResetSearch () {
      this.listQuery = Object.assign({}, defaultListQuery)
    },
    handleSearchList () {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.pageNum = 1
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    handleAdd () {
      this.dialogVisible = true
      this.isEdit = false
      this.role = Object.assign({}, defaultRole)
    },
    handleStatusChange (row, index) {
      updateStatus(row.id, { status: row.status }).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })

      this.getList()
    },
    handleDelete ({ row, index }) {
      this.$confirm('是否要删除该角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        ids.push(row.id)
        let params = new FormData()
        params.append("ids", ids)
        deleteRole(params).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleUpdate ({ row, index }) {
      this.dialogVisible = true
      this.isEdit = true
      this.role = JSON.parse(JSON.stringify(row))
      console.log(this.role)
    },
    handleDialogConfirm () {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateRole(this.role.id, this.role).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else {
          createRole(this.role).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        }
      })
    },
    handleSelectMenu ({ row, index }) {
      this.$router.push({ path: '/ums/allocMenu', query: { roleId: row.id } })
    },
    handleSelectResource ({ row, index }) {
      this.$router.push({ path: '/ums/allocResource', query: { roleId: row.id } })
    },
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    }
  }
}
</script>
<style></style>


