<template>
  <div class="app-container">
    <el-card
      class="filter-container"
      :style="{ marginBottom: '20px' }"
      :shadow="defalutData.cardShadow"
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
            <el-form-item label="输入搜索：">
              <el-input
                v-model="listQuery.keyword"
                class="input-width"
                placeholder="帐号/姓名"
                clearable
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card :style="{ marginBottom: '20px' }" :shadow="defalutData.cardShadow">
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

    <el-card :shadow="defalutData.cardShadow">
      <div>
        <powerful-table
          ref="menuTable"
          :list="list"
          :header="config"
          :isSelect="false"
          :total="total"
          :tableName="'menuTable'"
          @sizeChange="getList"
          @switchChange="handleStatusChange"
          @occupyOne="handleSelectRole"
          @update="handleUpdate"
          @remove="handleDelete"
        >
        </powerful-table>
      </div>
    </el-card>

    <el-dialog
      :title="isEdit ? '编辑用户' : '添加用户'"
      v-model="dialogVisible"
      width="40%"
    >
      <el-form :model="admin" ref="adminForm" label-width="150px">
        <el-form-item label="帐号：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="admin.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input
            v-model="admin.password"
            type="password"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            v-model="admin.note"
            type="textarea"
            :rows="5"
            style="width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status" v-if="dialogVisible">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm()"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="分配角色" v-model="allocDialogVisible" width="30%">
      <el-select
        v-model="allocRoleIds"
        multiple
        placeholder="请选择"
        style="width: 80%"
      >
        <el-option
          v-for="item in allRoleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <template #footer class="dialog-footer">
        <el-button @click="allocDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAllocDialogConfirm()"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole } from '@/api/logins'
import { fetchAllRoleList } from '@/api/ums/role'
import { header } from './indexData'
// import {formatDate} from  '@/utils/parse-time';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
}
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
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
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null
    }
  },
  created () {
    this.getList()
    this.getAllRoleList()
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
      this.admin = Object.assign({}, defaultAdmin)
    },
    handleStatusChange (row, index) {
      updateStatus(row.id, { status: row.status }).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })

        this.getList()
      })
    },
    handleDelete ({ row, index }) {
      deleteAdmin(row.id).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
    },
    handleUpdate ({ row, index }) {
      this.dialogVisible = true
      this.isEdit = true
      this.admin = Object.assign({}, row)
    },
    handleDialogConfirm () {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          updateAdmin(this.admin.id, this.admin).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            })
            this.dialogVisible = false
            this.getList()
          })
        } else {
          createAdmin(this.admin).then(response => {
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
    handleAllocDialogConfirm () {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new FormData()
        params.append("adminId", this.allocAdminId)
        params.append("roleIds", this.allocRoleIds)
        allocRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          })
          this.allocDialogVisible = false
        })
      })
    },
    handleSelectRole (row, index) {
      this.allocAdminId = row.id
      this.allocDialogVisible = true
      this.getRoleListByAdmin(row.id)
    },
    getList () {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.listLoading = false
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    getAllRoleList () {
      fetchAllRoleList().then(response => {
        this.allRoleList = response.data
      })
    },
    getRoleListByAdmin (adminId) {
      getRoleByAdmin(adminId).then(response => {
        let allocRoleList = response.data
        this.allocRoleIds = []
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id)
          }
        }
      })
    }
  }
}
</script>