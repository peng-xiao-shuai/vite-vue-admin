<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <!-- 注意 -->
      <div class="tipBox warning" style="margin-top: 0">
        <p>
          修改、删除 菜单并不会直接改变侧边栏。需要重新调用接口。<span
            class="active"
            @click="refreshMenu"
            >点击</span
          >
          刷新侧边栏
        </p>
      </div>
      <div class="operate-container">
        <div>
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
        </div>

        <div>
          <transition name="fadeOpticy">
            <el-button
              type="primary"
              class="btn-add"
              @click="backUp()"
              size="small"
              v-show="upParent.length > 0"
            >
              <i class="el-icon-back"></i>返回上级
            </el-button>
          </transition>
          <el-button
            type="primary"
            class="btn-add"
            @click="handleAddMenu()"
            size="small"
          >
            添加
          </el-button>
        </div>
      </div>
      <div>
        <powerful-table
          ref="menuTable"
          :list="powerfulTableData.list"
          :header="header"
          :isSelect="false"
          :pagination-property="{
            total: powerfulTableData.total,
          }"
          :tableName="'menuTable'"
          @size-change="getList"
          @sort-custom="handleSortCustom"
          @component-event="handleComponentChange"
          @btn-click="handleBtnClick"
        />
      </div>
    </el-card>
    <!-- 编辑区 -->
    <!-- update
      v-model:dialog="isDialog"
      v-model:currentFrom="currentFrom.value"
      :selectMenuList="allList.value"
      @refresh="getList"
    ></update>< -->
  </div>
</template>

<script lang="ts" setup>
import { fetchList, deleteMenu, updateMenu } from '@/api/ums/menu'
import { useData, RowType } from './indexData'
// 组件
// import Update from './components/update.vue'
import { useRouter } from 'vue-router'
import { Handlers } from 'el-plus-powerful-table-ts'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

const {
  header,
  powerfulTableData,
  currentForm,
  parentId,
  upParent,
  allList,
  isDialog,
} = useData()

const userStore = useUserStore()
const router = useRouter()

const getList = () => {
  fetchList(parentId.value, powerfulTableData.listQuery).then((res) => {
    powerfulTableData.list = res.data.list
    powerfulTableData.total = res.data.total
  })
}

getList()

const handleSortCustom: Handlers['sort-custom'] = (e) => {
  powerfulTableData.listQuery[e.prop] = e.order
  getList()
}

const handleComponentChange: Handlers['component-event'] = (payload) => {
  switch (payload.componentName) {
    // 停用事件
    case 'switch':
      const e = payload.row
      if (userStore.userInfo.id == e.id && e.status === 0) {
        ElMessage.error('你的账号已被停用！')
      }
      break
  }
}

const handleBtnClick: Handlers['btn-click'] = ({ params, row }) => {
  console.log(params, row)
  switch (params) {
    case 'query':
      // switchs.role = true;
      handleShowNextLevel(row)
      break
    case 'update':
      handleUpdate(row)
      break
    case 'remove':
      handleDelete(row)
      break
  }
}

const handleShowNextLevel = (row: RowType) => {
  upParent.value.push(row)

  allList.value = [upParent.value[upParent.value.length - 1]]
  parentId.value = row.id

  getList()
}

const handleUpdate = (row: RowType) => {
  isDialog.value = true
  Object.assign(currentForm, JSON.parse(JSON.stringify(row)))
  // console.log(currentFrom);
}

const handleDelete = (row: RowType) => {
  deleteMenu([row.id]).then(() => {
    ElMessage.success('删除成功！')
    getList()
  })
}

// 刷新菜单
const refreshMenu = () => {
  router.getRoutes().forEach((item: any) => {
    if (item.meta && item.meta.id) {
      router.removeRoute(item.name)
    }
  })
  userStore.userInfoRequest()
}

const backUp = () => {
  powerfulTableData.listQuery.pageNum = 1
  parentId.value = upParent.value[upParent.value.length - 1].parentId
  allList.value = [upParent.value[upParent.value.length - 1]]
  upParent.value.splice(upParent.value.length - 1, 1)

  getList()
}

const handleAddMenu = () => {
  isDialog.value = true
  let row = { parentId: parentId.value, hidden: 0, sort: 0 }
  Object.assign(currentForm, JSON.parse(JSON.stringify(row)))
}
</script>

<style scoped>
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
