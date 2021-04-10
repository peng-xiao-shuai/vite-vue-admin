<template>
  <div class="app-container">
    <el-card
      :style="{ marginBottom: '20px' }"
      class="filter-container"
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
            <el-form-item label="资源名称：">
              <el-input
                v-model="listQuery.nameKeyword"
                class="input-width"
                placeholder="资源名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="资源路径：">
              <el-input
                v-model="listQuery.urlKeyword"
                class="input-width"
                placeholder="资源路径"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="资源分类：">
              <el-select
                v-model="listQuery.categoryId"
                placeholder="全部"
                clearable
                class="input-width"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
          <el-button size="mini" class="btn-add" @click="handleShowCategory()">
            资源分类
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
          @update="handleUpdate"
          @remove="handleDelete"
        >
        </powerful-table>
      </div>
    </el-card>

    <!-- 编辑区 -->
    <update
      v-model:dialog="isDialog"
      v-model:currentFrom="resource"
      :selectMenuList="categoryOptions"
      @refresh="getList"
    ></update>
  </div>
</template>
<script>
import { fetchList, deleteResource, listAllCate } from '/@/api/ums/resource'

import { header } from './indexData'

import update from './components/update.vue'

// import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: null,
  urlKeyword: null,
  categoryId: null
}
const defaultResource = {
  id: null,
  name: null,
  url: null,
  categoryId: null,
  description: ''
}
export default {
  name: 'resource',
  components: {
    update
  },
  data () {
    return {
      // 表格配置
      config: header,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,

      listLoading: false,
      isDialog: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      categoryOptions: [],
      defaultCategoryId: null
    }
  },
  created () {
    this.getList()
    this.getCateList()
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
      this.isDialog = true
      this.isEdit = false
      this.resource = Object.assign({}, defaultResource)
      this.resource.categoryId = this.defaultCategoryId
    },
    handleDelete (row, index) {

      deleteResource(row.id).then(response => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getList()
      })
    },
    handleUpdate (row, index) {
      this.isDialog = true
      this.isEdit = true
      this.resource = Object.assign({}, row)
    },
    handleShowCategory () {
      console.log(this.$router)
      this.$router.push({ name: 'resourceCategory' })
    },
    getList (e) {
      this.isDialog = false

      Object.assign(this.listQuery, e ? e : {})
      fetchList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    getCateList () {
      listAllCate().then(response => {
        let cateList = response.data
        for (let i = 0; i < cateList.length; i++) {
          let cate = cateList[i]
          this.categoryOptions.push({ label: cate.name, value: cate.id })
        }
        this.defaultCategoryId = cateList[0].id
      })
    }
  }
}
</script>