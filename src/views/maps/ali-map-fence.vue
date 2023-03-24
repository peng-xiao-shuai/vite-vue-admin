<template>
  <div class="electronic">
    <div id="map"></div>
    <div
      :class="['panel _flex _flex-justify-between', showList ? '' : 'pack-up']"
    >
      <div class="navicon _flex _flex-align-center">
        <i
          class="el-icon"
          style="margin-right: 10px"
          @click="showList = !showList"
        >
          <Back />
        </i>
        <span>电子围栏列表</span>
      </div>
      <el-scrollbar class="list-box">
        <div
          class="list-item _flex _flex-align-center _flex-justify-between pointer"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div
            @click="viewPolygon(item)"
            class="list-item-content _flex _flex-align-center"
          >
            <el-icon><Guide /></el-icon>
            <span>{{ item.fenceName ? item.fenceName : '未命名' }}</span>
            <span style="color: var(--el-color-info-light-3)"
              >（{{ item.fenceCode }}）</span
            >
          </div>
          <!-- 操作按钮 -->
          <div class="list-item-operate">
            <el-button
              @click="editPolygon($event, item)"
              type="primary"
              icon="edit"
              size="small"
            />
            <el-button
              @click="handleRemove(item, index)"
              type="danger"
              icon="delete"
              size="small"
            />
          </div>
        </div>
      </el-scrollbar>

      <div class="form-element">
        <el-input
          placeholder="查询电子围栏名称"
          v-model="fenceName"
          maxlength="10"
          show-word-limit
        >
          <template #append>
            <el-button icon="search" @click="getList(fenceName)" />
          </template>
        </el-input>
        <div class="btn _flex _flex-justify-between">
          <el-button type="default" @click="createDraw"
            >绘制新电子围栏</el-button
          >
          <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
      </div>
    </div>

    <div class="search">
      <el-input type="text" placeholder="查询地址" v-model="searchText">
        <template #append>
          <el-button
            icon="search"
            @click="searchText && findSearch(searchText)"
          />
        </template>
      </el-input>
    </div>

    <el-dialog
      class="save-dialog"
      v-model="dialogVisible"
      width="300px"
      :show-close="false"
    >
      <el-form
        class="form"
        :model="currentData"
        :rules="rules"
        label-position="top"
      >
        <el-form-item prop="fenceCode" label="电子围栏编号" style="width: 100%">
          <el-input
            v-model="currentData.fenceCode"
            placeholder="请输入电子围栏编号"
          />
        </el-form-item>
        <el-form-item prop="fenceName" label="电子围栏名称" style="width: 100%">
          <el-input
            v-model="currentData.fenceName"
            placeholder="请输入电子围栏名称"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
            >取 消</el-button
          >
          <el-button :loading="saveStatus" type="primary" @click="submit">{{
            saveStatus ? '保存中' : '确 定'
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useAMapFence } from '@/hooks/useMap'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onMounted, ref, reactive } from 'vue'
import { List } from '#/index'
import { fenceList } from '@/api/other'
const fenceName = ref('') // 输入值
// 是否显示列表
const showList = ref(true)
const dataList = ref<List[]>([])
const searchText = ref('')
// 弹出框
const dialogVisible = ref(false)
// 保存状态
const saveStatus = ref(false)

const rules = reactive({
  fenceName: [
    { required: true, message: '请输入电子围栏名称', trigger: 'blur' },
    {
      min: 1,
      max: 10,
      message: '长度在 1 到 10 个字符',
      trigger: 'blur',
    },
  ],
  fenceCode: [
    { required: true, message: '请输入电子围栏编号', trigger: 'blur' },
    {
      min: 1,
      max: 10,
      message: '长度在 1 到 10 个字符',
      trigger: 'blur',
    },
  ],
})
onMounted(() => {
  getList()
})

const {
  currentData,
  isDraw,
  isInit,
  get,
  unmounted,
  initMap,
  renderData,
  removePolygon,
  viewPolygon,
  editPolygon,
  createDraw,
  findSearch,
  pushPolygon,
} = useAMapFence(
  dataList,
  () => {
    ElMessage.error('111111')
  },
  (res) => {
    ;(ElMessage as Indexes)[res.status](res.msg)
  }
)

// 保存按钮
const handleSave = () => {
  if (!isDraw.value && !currentData.id) {
    ElMessage.warning('请先完成电子围栏绘制！')
    return
  }

  dialogVisible.value = true
}

// 保存
const submit = () => {
  currentData.fencePath = (get('polyEditor')?.getTarget() as any)?._opts
    .path as [number, number][]

  // 调用接口
  saveStatus.value = true
  setTimeout(() => {
    dialogVisible.value = false
    saveStatus.value = false
    // 如果是请求接口，则需要调用新增接口后，后端返回ID
    const id = Number(new Date())
    // 如果是新增，执行时机很重要，必须在 dataList 新增之前
    pushPolygon(currentData.id ? currentData.id : id)

    const { fenceCode, fenceName, fencePath } = currentData
    if (!dataList.value.some((item) => item.id === currentData.id)) {
      dataList.value.push({ fenceCode, fenceName, fencePath, id })
    } else {
      dataList.value.forEach((item) => {
        if (item.id === currentData.id) {
          item.fenceCode = fenceCode
          item.fenceName = fenceName
          item.fencePath = fencePath
        }
      })
    }

    ElMessage.success('保存成功！')
  }, 1000)
}

const handleRemove = (item: List, index: number) => {
  ElMessageBox.confirm(
    '是否确认删除名称为"' + item.fenceName + '"的电子围栏?',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    removePolygon(index)
    dataList.value.splice(index, 1)
  })
}

const getList = (name?: string) => {
  fenceList<{ data: List[] }>(name).then((res) => {
    // 销毁多边形
    if (res.data.data.length) {
      unmounted()
    }

    dataList.value = res.data.data.map((item) => ({
      ...item,
      fencePath: item.fencePath,
    }))
    if (!isInit.value) {
      initMap().then(() => {
        console.log('初始化')
      })
    } else {
      renderData()
    }
  })
}
</script>
<style scoped lang="scss">
.electronic {
  position: relative;
  height: 600px;

  & :deep(.el-form) {
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  #map {
    width: 100%;
    height: 100%;
  }
  .panel {
    width: 300px;
    // 顶部底部间隙20px 顶部底部15px 内边距
    height: calc(100% - 30px - 40px);
    right: 5px;
    position: absolute;
    left: 20px;
    top: 20px;
    /* text-align: center; */
    background: var(--el-bg-color);
    transition: 0.3s;
    border-radius: 10px;
    // box-shadow: 1px 2px 1px rgb(0 0 0 / 15%);
    box-shadow: 0px 0px 10px #ccc;
    padding: 15px;
    overflow: hidden;
    flex-direction: column;
    .navicon {
      width: 300px;
      font-weight: 600;
      color: var(--el-text-color-regular);
      .el-icon {
        font-size: 20px;
      }
    }
  }

  .panel.pack-up {
    width: 20px;
    overflow: hidden;
    height: 20px !important;
    padding: 10px;
    * {
      display: none;
      padding: 0;
      margin: 0;
    }
    .navicon {
      display: block;
      .el-icon {
        display: block;
        * {
          display: block;
        }
      }
    }
  }

  .search {
    background: var(--el-bg-color);
    padding: 5px;
    width: 40%;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .list-box {
    margin: 15px 0;
    font-size: 13px;
    min-width: 300px;
    height: calc(100% - 30px - 18px - 80px);
    .list-item:nth-child(1) {
      padding-top: 0 !important;
    }

    .list-item {
      display: flex;
      padding: 10px 0;
      font-size: 14px;
      color: var(--el-text-color-regular);

      &-content {
        flex: 1;
        font-size: 16px;

        .el-icon {
          color: var(--color-primary);
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      &-operate {
        .el-button {
          padding: 5px 8px;
        }
      }
    }
  }
  .form-element {
    width: calc(100%);

    .btn {
      width: 100%;
      margin-top: 15px;
    }
  }

  :deep(.save-dialog) {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: var(--el-dialog-padding-primary) var(--el-dialog-padding-primary)
        0 var(--el-dialog-padding-primary);
    }
  }
}
</style>
