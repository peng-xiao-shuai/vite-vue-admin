<template>
  <div class="app-container">
    <el-card
      class="filter-container"
      :style="{ marginBottom: '20px' }"
      :shadow="defaultData.cardShadow"
    >
      <div class="operate-container">
        <div class="_flex _flex-align-center">
          <el-icon><Search /></el-icon>
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
        <el-form :inline="true" :model="powerfulTableData.listQuery">
          <div class="screenForm">
            <el-form-item label="书名：">
              <el-input
                v-model="powerfulTableData.listQuery.name"
                placeholder="请输入书名"
                style="width: 80%"
                clearable
              />
            </el-form-item>
            <el-form-item label="书类型：" prop="types">
              <el-select
                v-model="powerfulTableData.listQuery.types"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in selectMenuList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

    <el-card :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div class="_flex _flex-align-center">
          <el-icon style="font-size: 18px"><Tickets /></el-icon>
          <div>数据列表</div>
        </div>

        <div>
          <el-button
            type="primary"
            class="btn-add"
            @click="() => (isDialog = true)"
          >
            添加
          </el-button>
        </div>
      </div>
      <powerful-table
        ref="Table"
        :list="powerfulTableData.list"
        :header="header"
        :isSelect="true"
        :tableName="'Table'"
        :operateData="operateData"
        :selectData="selectData"
        :pagination-property="{
          total: powerfulTableData.total,
        }"
        @size-change="getList"
        @sort-custom="handleSortCustom"
        @component-event="handleComponentChange"
        @batch-operate="handleBatchChange"
        @btn-click="handleBtnClick"
      />
      <!--
          @update="handleUpdate"
          @remove="handleDelete" -->
    </el-card>
    <!-- 编辑区 -->
    <Update
      v-model:dialog="isDialog"
      v-model:currentForm="currentForm"
      :selectMenuList="selectMenuList"
      @refresh="refresh"
    />
  </div>
</template>

<script lang="ts">
import { Search, Tickets } from '@element-plus/icons'
import { tableFun, bookListsDelete } from '@/api/modules/table'
import { useData } from './indexData'
import { defineComponent } from 'vue'

// 组件
import Update from './components/update.vue'
import { ElMessage } from 'element-plus'
import { Handlers } from 'el-plus-powerful-table-ts'

export default defineComponent({
  name: 'ModulesTable',
  components: {
    Update,
    Search,
    Tickets,
  },
  setup() {
    const {
      selectData,
      header,
      powerfulTableData,
      selectMenuList,
      operateData,
      isDialog,
      currentForm,
    } = useData()

    const getList = (e?: {
      params?: { pageNum: number | string; pageSize: number | string }
      select?: []
    }) => {
      // 获取选中
      selectData.value = e?.select || []

      if (e?.params) {
        Object.assign(powerfulTableData.listQuery, e.params)
        console.log(powerfulTableData.listQuery, e.params)
      }

      tableFun(powerfulTableData.listQuery).then((response) => {
        powerfulTableData.list = response.data.list
        powerfulTableData.total = response.data.total
      })
    }
    getList()

    const handleSortCustom: Handlers['sort-custom'] = (e) => {
      powerfulTableData.listQuery[e.prop] = e.order
      getList()
    }
    const handleComponentChange: Handlers['component-event'] = (payload) => {
      switch (payload.componentName) {
        case 'switch':
          console.log(payload)

          powerfulTableData.list[payload.index || 0] = payload.row
          ElMessage.success('修改成功')
          break
      }
    }
    const handleBatchChange: Handlers['batch-operate'] = ({ ids, item }) => {
      switch (item.value) {
        case 0:
        case 1:
          powerfulTableData.list.forEach((each: any, _index: number) => {
            if (ids.indexOf(each.id) !== -1) {
              if (item.value === 0) {
                each.recommend = 1
              } else {
                each.recommend = 0
              }
            }
          })
          ElMessage.success('修改成功')

          break
        case 2:
          _delete(ids as number[])
          break
      }
    }

    const handleBtnClick: Handlers['btn-click'] = ({ params, row }) => {
      switch (params) {
        case 'update':
          isDialog.value = true
          const _Row = { ...row }
          _Row.image = [
            {
              url: row.image,
              name: 'book.jpg',
            },
          ]
          Object.assign(currentForm, _Row)
          break
        case 'delete':
          _delete([row.id])
          break
      }
    }

    const _delete = (ids: number[]) => {
      bookListsDelete(ids).then(() => {
        ElMessage.success('删除成功')
        getList()
      })
    }

    // 重置
    const handleResetSearch = () => {
      Object.keys(powerfulTableData.listQuery).forEach(
        (item: any, _index: number) => {
          let arr = ['pageNum', 'pageSize']
          if (arr.indexOf(item) == -1) {
            powerfulTableData.listQuery[item] = ''
          }
        }
      )
    }

    const refresh = (from: any) => {
      // 添加修改
      if (from.id) {
        let index = powerfulTableData.list
          .map((item: any) => item.id)
          .indexOf(from.id)

        from.image = from.image[0].url
        powerfulTableData.list[index] = from
      } else {
        powerfulTableData.list.push({
          ...from,
          image: from.image[0].url,
          id: powerfulTableData.list[powerfulTableData.list.length - 1].id + 1,
          iconfont: 'vitehome-liulanliang',
          href: 'https://gitee.com/abc1612565136/vite-admin',
        })
      }
    }

    return {
      // 变量
      operateData,
      isDialog,
      currentForm,
      selectData,
      selectMenuList,
      powerfulTableData,
      header,

      // 方法
      handleResetSearch,
      handleBtnClick,
      refresh,
      getList,
      handleComponentChange,
      handleBatchChange,
      handleSortCustom,
    }
  },
})
</script>

<style scoped>
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
