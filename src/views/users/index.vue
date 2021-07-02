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
          <el-button style="float: right" type="primary" @click="getListAll()">
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
            <el-form-item label="用户名：">
              <el-input
                v-model="listQuery.nickName"
                placeholder="请输入用户名"
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
      </div>
    </el-card>

    <!-- 会员列表 -->
    <el-card :shadow="defaultData.cardShadow">
      <div>
        <powerful-table
          ref="menuTable"
          :list="list"
          :header="config"
          :isSelect="false"
          :total="total"
          :tableName="'menuTable'"
          @sizeChange="getListAll"
          @update="handleUpdate"
        >
        </powerful-table>
      </div>
    </el-card>

    <!-- 编辑区 -->
    <update
      v-model:dialog="isDialog"
      v-model:currentFrom="currentFrom"
      @refresh="getListAll"
    ></update>
  </div>
</template>
<script>
import { userlist } from "@/api/users/user"
import { header } from "./indexData"

import update from './components/update.vue'

const defineQuery = {
  pageNum: 1,
  pageSize: 10,
  nickName: ''
}

export default {
  name: 'user',
  components: {
    update
  },
  data () {
    return {
      total: 0,
      config: header,

      listQuery: Object.assign(defineQuery),

      isDialog: false,
      currentFrom: {},

      list: [],
    }
  },
  mounted () {
    this.getListAll()
  },
  methods: {
    handleResetSearch () {
      this.listQuery = Object.assign(defineQuery)
    },

    getListAll (e) {
      Object.assign(this.listQuery, e ? e : {})

      userlist(this.listQuery).then((res) => {
        this.total = res.data.total

        this.list = res.data.list
      })
    },
    // 修改接口
    handleUpdate (row, index) {
      this.isDialog = true

      this.currentFrom = JSON.parse(JSON.stringify(row))

      console.log(this.currentFrom)
    },
  },
};
</script>