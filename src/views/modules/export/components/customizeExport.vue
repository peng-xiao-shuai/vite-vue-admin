<template>
  <div class="tipBox warning">
    <span>
      使用
      <a
        style="color: #409eff"
        target="_blank"
        href="https://github.com/exceljs/exceljs/blob/master/README_zh.md"
        >xlsx</a
      >
      实现导入数据<span style="font-size: 13px; color: var(--el-color-info)"
        >（注：该示例仅供参考，具体逻辑请自行实现）</span
      >
    </span>
  </div>
  <div class="tipBox">
    基础表格导出
    <div style="font-size: 13px; color: var(--el-color-info)"></div>
  </div>
  <div>
    <el-form :inline="true" :model="formInline1" size="small">
      <el-form-item label="副标题：">
        <el-input v-model="formInline1.subtitle" placeholder="副标题" />
      </el-form-item>
      <el-form-item label="对其方式：">
        <el-select
          v-model="formInline1.align"
          placeholder="对其方式"
          style="width: 100px"
        >
          <el-option label="靠左" value="left" />
          <el-option label="居中" value="center" />
          <el-option label="靠右" value="right" />
        </el-select>
      </el-form-item>
      <el-form-item label="边框：">
        <el-radio-group v-model="formInline1.border">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自适应宽度：">
        <el-radio-group v-model="formInline1.autoWidth">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="带斑马纹：">
        <el-radio-group v-model="formInline1.stripe">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <!-- TODO 导入功能 -->
          <!-- <el-button type="primary" icon="el-icon-bottom" size="mini">导入</el-button> -->
          <el-button type="primary" icon="files" size="small" @click="export1"
            >导出</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
    <p></p>
    <el-table
      :data="tableData1"
      height="200"
      :border="formInline1.border"
      :stripe="formInline1.stripe"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        :align="formInline1.align"
        label="Date"
        width="180"
      />
      <el-table-column
        prop="name"
        :align="formInline1.align"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        :align="formInline1.align"
        label="Address"
      />
    </el-table>
    <p></p>
    <multipleHeadersExport />
    <p></p>
    <div class="tipBox">
      多表格导出
      <div style="font-size: 13px; color: var(--el-color-info)">
        （一次导出上面两个表格，通过xlsx文档下面sheet页签切换）
      </div>
    </div>
    <el-button-group>
      <!-- <el-button type="primary" icon="el-icon-bottom" size="mini">导入</el-button> -->
      <el-button type="primary" icon="files" size="small" @click="export3"
        >多表导出</el-button
      >
    </el-button-group>
    <p></p>
    <div class="tipBox warning">
      <span>
        参数文档<span style="font-size: 13px; color: var(--el-color-info)"
          >（为了更方便使用，我们为此封装了一个公共方法用于导出，通过传入参数数据的形式控制导出内容，目前仅支持基础导出功能，也就是上面两个导出表格例子展示的内容，其他业务逻辑可以参考
          <a
            style="color: #409eff"
            target="_blank"
            href="https://github.com/exceljs/exceljs/blob/master/README_zh.md"
            >xlsx</a
          >
          官方文档自行实现）</span
        >
      </span>
    </div>
    <div class="tipBox">
      公共方法及参数
      <div style="font-size: 13px; color: var(--el-color-info)">
        （exportExcelSheet(exportData,configData)）
      </div>
    </div>

    <powerful-table :list="list" :header="config" :isPagination="false" />
  </div>
</template>

<script lang="ts">
import { header, lists } from './indexData'
import { ref, reactive, defineComponent, toRefs, onMounted } from 'vue'
import { exportExcelSheet } from '@/utils/export'
import { tableData1 } from './indexData'
import type { ExportData } from '@/utils/export/exportType'
import multipleHeadersExport from './multipleHeadersExport.vue'

export default defineComponent({
  components: { multipleHeadersExport },
  setup() {
    const multipleTable = ref()
    const state = reactive({
      tableData1: tableData1,
      formInline1: {
        subtitle: 'XXX系统',
        align: 'center',
        border: true,
        autoWidth: true,
        stripe: false,
      },
    })

    let list = ref(lists)
    let config = reactive(header)
    const export1 = () => {
      const exportData = [
        {
          header: ['Date', 'Name', 'Address'],
          prop: ['date', 'name', 'address'],
          list: state.tableData1,
          multiHeader: [state.formInline1.subtitle],
        },
      ]
      exportExcelSheet(exportData, {
        border: state.formInline1.border,
        autoWidth: state.formInline1.autoWidth,
        align: state.formInline1.align,
        stripe: state.formInline1.stripe,
      })
    }
    const export3 = () => {
      const exportData: ExportData[] = [
        {
          header: ['Date', 'Name', 'Address'],
          prop: ['date', 'name', 'address'],
          list: state.tableData1,
          multiHeader: [state.formInline1.subtitle],
          border: state.formInline1.border,
          autoWidth: state.formInline1.autoWidth,
          align: state.formInline1.align,
          stripe: state.formInline1.stripe,
        },
        {
          header: ['Date', 'Name', 'Address'],
          list: state.tableData1,
          multiHeader: [state.formInline1.subtitle],
          border: state.formInline1.border,
          autoWidth: state.formInline1.autoWidth,
          align: state.formInline1.align,
          stripe: state.formInline1.stripe,
        },
      ]
      exportExcelSheet(exportData, { fileName: '多表导出' })
    }
    onMounted(() => {})
    return {
      list,
      config,
      multipleTable,
      onMounted,
      export1,
      export3,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="scss" scoped>
.tipBox {
  font-size: 15px !important;
}
</style>
