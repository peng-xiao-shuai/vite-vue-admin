<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <!-- 注意 -->
      <div class="tipBox warning" style="margin-top: 0">
        <p>修改、删除 菜单并不会直接改变侧边栏。需要重新调用接口。<span class="active" @click='refreshMenu'>点击</span> 刷新侧边栏</p>
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
              size="mini"
              v-show="upParent.value.length > 1"
            >
              <i class="el-icon-back"></i>返回上级
            </el-button>
          </transition>
          <el-button
            type="primary"
            class="btn-add"
            @click="handleAddMenu()"
            size="mini"
          >
            添加
          </el-button>
        </div>
      </div>
      <div>
        <powerful-table
          ref="menuTable"
          :list="list.value"
          :header="config"
          :isSelect="false"
          :total="total"
          :tableName="'menuTable'"
          @sizeChange="getList"
          @switchChange="handleHiddenChange"
          @query="handleShowNextLevel"
          @update="handleUpdate"
          @remove="handleDelete"
        >
        </powerful-table>
      </div>
    </el-card>
    <!-- 编辑区 -->
    <update
      v-model:dialog="isDialog"
      v-model:currentFrom="currentFrom.value"
      :selectMenuList="allList.value"
      @refresh="getList"
    ></update>
  </div>
</template>

<script>
import {
  fetchList,
  deleteMenu,
  updateMenu,
} from "@/api/ums/menu"
import { header } from "./indexData.ts"
import { ref, reactive, defineComponent, getCurrentInstance } from 'vue'

// 组件
import update from './components/update.vue'
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const menusArr = [{ id: 0, title: '无上级菜单' }]

export default defineComponent({
  components: {
    update
  },
  setup () {
    const {proxy} = getCurrentInstance()
    const router = useRouter()
    const store = useStore()

    let list = reactive({ value: [] })
    // 渲染的菜单
    let allList = reactive({ value: [] })

    let total = ref(0)
    let config = reactive(header)
    let listQuery = reactive({
      pageNum: 1,
      pageSize: 10,
    })

    let parentId = ref(0)
    // 存储上级信息
    let upParent = reactive({ value: [] })

    // 编辑区显隐
    let isDialog = ref(false)
    // 编辑区当前数据
    let currentFrom = reactive({ value: {} })

    getList()

    function handleAddMenu () {
      isDialog.value = true
      currentFrom.value = { parentId: parentId.value, hidden: 0, sort: 0 }
    }
    function getList (e) {
      if (parentId.value == 0) {
        upParent.value = [menusArr]
        allList.value = menusArr
      }

      Object.assign(listQuery, e ? e : listQuery)
      fetchList(parentId.value, listQuery).then((res) => {
        list.value = reactive(res.data.list)
        total.value = res.data.total
      })
    }
    function handleHiddenChange (row) {
      updateMenu(row).then((response) => {
        proxy.$message({
          message: "修改成功",
          type: "success",
          duration: 1000,
        })
      })
    }
    function handleShowNextLevel ({ row, index }) {
      upParent.value.push([row])

      allList.value = upParent.value[upParent.value.length - 1]

      parentId.value = row.id

      getList()
    }
    function backUp () {
      listQuery.pageNum = 1
      parentId.value = upParent.value[upParent.value.length - 1][0].parentId
      allList.value = upParent.value[upParent.value.length - 1]
      upParent.value.splice(upParent.value.length - 1, 1)

      getList()
    }
    function handleUpdate ({ row, index }) {
      isDialog.value = true

      currentFrom.value = reactive(JSON.parse(JSON.stringify(row)))
      // console.log(currentFrom);
    }
    function handleDelete ({ row, index }) {
      deleteMenu([row.id]).then((response) => {
        proxy.$message({
          message: "删除成功",
          type: "success",
          duration: 1000,
        })
        getList()
      })
    }

    // 刷新菜单
    const refreshMenu = () => {
      router.getRoutes().forEach((item) => {
        if (item.meta && item.meta.id) {
          router.removeRoute(item.name)
        }
      })

      store.dispatch('userInfo')
    }

    return {
      // 变量
      list,
      total,
      config,
      listQuery,
      parentId,
      upParent,
      isDialog,
      currentFrom,
      allList,

      // 方法
      handleAddMenu,
      getList,
      backUp,
      handleHiddenChange,
      handleShowNextLevel,
      handleUpdate,
      handleDelete,
      refreshMenu
    }
  }
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
