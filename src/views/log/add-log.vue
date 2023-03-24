<template>
  <el-card :shadow="defaultData.cardShadow">
    <view-name />

    <div style="margin: 15px 0">
      <el-form :inline="true" :model="addQuery">
        <div class="screenForm">
          <el-form-item>
            <el-input
              v-model="addQuery.info"
              placeholder="请输入问题信息"
              style="width: 80%"
              clearable
            />
          </el-form-item>
          <el-form-item prop="url">
            <el-input
              v-model="addQuery.url"
              placeholder="请输入问题地址"
              style="width: 80%"
              clearable
            />
          </el-form-item>
          <el-form-item prop="error">
            <el-input
              v-model="addQuery.error"
              placeholder="请输入问题详情"
              style="width: 80%"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addLog">提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div style="margin: 15px 0">新问题</div>

    <powerful-table
      :list="sList"
      :header="header"
      :isPagination="false"
      isSelect
      :operateData="operateData"
      @batch-operate="handleBatchChange"
    />

    <div style="margin: 15px 0">历史问题</div>

    <powerful-table
      ref="Table"
      :list="list"
      :header="header"
      :total="total"
      @size-change="getList"
    />
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useData } from './indexData'
import { getLogList } from '@/api/other'
import { useSettingStore } from '@/stores'

export default defineComponent({
  setup() {
    const { header, operateData, sList, addQuery, listQuery } = useData()
    const settingStore = useSettingStore()
    const total = ref(0)
    const list = ref([])
    const getList = (e?: { pageSize: number; pageNum: number }) => {
      Object.assign(listQuery, e ? e : {})
      getLogList(listQuery).then((res) => {
        list.value = res.data.list
        total.value = res.data.total
      })
    }
    getList()
    const handleBatchChange = () => {
      console.log('上传')
    }
    const addLog = () => {
      settingStore.errorLog.push(JSON.parse(JSON.stringify(addQuery)))
    }

    return {
      list,
      sList,
      operateData,
      addQuery,
      total,
      handleBatchChange,
      addLog,
      getList,
      header,
    }
  },
})
</script>

<style lang="scss" scoped></style>
