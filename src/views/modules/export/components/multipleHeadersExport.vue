<template>
  <div class="tipBox">
    复杂表格导出
    <div style="font-size: 13px; color: var(--el-color-info)">
      （多级表头，合计）
    </div>
  </div>
  <el-form :inline="true" :model="formInline2">
    <el-form-item label="对其方式：">
      <el-select
        v-model="formInline2.align"
        placeholder="对其方式"
        style="width: 100px"
      >
        <el-option label="靠左" value="left" />
        <el-option label="居中" value="center" />
        <el-option label="靠右" value="right" />
      </el-select>
    </el-form-item>
    <el-form-item label="边框：">
      <el-radio-group v-model="formInline2.border">
        <el-radio-button :label="true">是</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="自适应宽度：">
      <el-radio-group v-model="formInline2.autoWidth">
        <el-radio-button :label="true">是</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="带斑马纹：">
      <el-radio-group v-model="formInline2.stripe">
        <el-radio-button :label="true">是</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否合计：">
      <el-radio-group v-model="formInline2.showSummary">
        <el-radio-button :label="true">是</el-radio-button>
        <el-radio-button :label="false">否</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <template v-if="formInline2.showSummary">
      <el-form-item>
        <template #label>
          是否需要单位
          <el-popover
            placement="top"
            title="提示说明"
            :width="200"
            trigger="hover"
            content="是否在合计数字后面显示单位，该单位来源于表头label设置在英文小括号”()“中的文本内容"
          >
            <template #reference>
              <i class="el-icon-question"></i>
            </template>
          </el-popover>
          ：
        </template>
        <el-radio-group v-model="formInline2.showUnit">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="保留小数位：">
        <el-input
          style="width: 100px"
          v-model="formInline2.sumToFixed"
          placeholder="请输入"
        >
          <template #append>位</template>
        </el-input>
      </el-form-item>

      <el-form-item label="第一列文本内容：">
        <el-input
          style="width: 100px"
          v-model="formInline2.sumText"
          placeholder="请输入"
        />
      </el-form-item>

      <el-form-item label="无数据文本内容：">
        <el-input
          style="width: 100px"
          v-model="formInline2.emptyText"
          placeholder="请输入"
        />
      </el-form-item>
    </template>
    <el-form-item>
      <el-button-group>
        <!-- <el-button type="primary" icon="el-icon-bottom" size="mini">导入</el-button> -->
        <el-button type="primary" icon="Files" @click="export2">导出</el-button>
      </el-button-group>
    </el-form-item>
  </el-form>
  <h4>多级表头参数说明：</h4>
  此处涉及到exportData导出数据的两个参数：
  <ul>
    <li><el-tag>multiHeader</el-tag>{Array}：表头名称数据。</li>
    <li>
      <el-tag>merges：</el-tag
      >{Array}：合并项规则，需要合并的单元格数据，该属性与“multiHeader”配合使用，一个标题对应一个合并项。例如：['A1:A3',
      'B1:F1', 'B2:B3', 'C2:F2', 'C3:C3', 'D3:D3', 'E3:E3','F3:F3',
      'G3:G3']，其中每个元素中的A，B，C，D...代表表格的纵坐标，
      1，2，3，4...代表表格的横坐标，一个纵坐标(字母)和一个横坐标(数字)结合确定一个单元格，参考Excel文档。
    </li>
  </ul>
  以下表为例：
  <ul>
    <li>
      Data表头属于行合并，是从A1单元格合并到A3单元格，因此合并项数据为A1:A3；
    </li>
    <li>
      Delivery Info是列合并，从B1单元格合并到F1单元格，因此合并项数据为B1:F1；
    </li>
    <li>如果没有合并项的单元格例如State合并项数据首尾相同为C3:C3；</li>
  </ul>
  <p></p>
  <el-table
    ref="multipleTable"
    :data="tableData2"
    :border="formInline2.border"
    :stripe="formInline2.stripe"
    :summary-method="getSummaries"
    :show-summary="formInline2.showSummary"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      :align="formInline2.align"
      label="Date"
      width="150"
    />
    <el-table-column label="Delivery Info">
      <el-table-column
        prop="name"
        :align="formInline2.align"
        label="Name"
        width="120"
      />
      <el-table-column label="Address Info">
        <el-table-column
          prop="state"
          :align="formInline2.align"
          label="State"
          width="120"
        />
        <el-table-column
          prop="city"
          :align="formInline2.align"
          label="City"
          width="120"
        />
        <el-table-column
          prop="address"
          :align="formInline2.align"
          label="Address"
        />
        <el-table-column
          prop="money"
          :align="formInline2.align"
          label="Money(RMB)"
          width="120"
        />
        <el-table-column
          prop="zip"
          :align="formInline2.align"
          label="Zip"
          width="120"
        />
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import { exportExcelSheet } from '@/utils/export'
import { tableData2 } from './indexData'
export default defineComponent({
  name: '',
  setup() {
    const state = reactive({
      tableData2: tableData2,
      formInline2: {
        align: 'center',
        border: true,
        autoWidth: true,
        stripe: false,
        showSummary: true,
        showUnit: true,
        sumToFixed: 2,
        sumText: 'Total Cost',
        emptyText: '-',
      },
      sums: [''],
    })
    onMounted(() => {})
    const export2 = () => {
      const exportData = [
        {
          prop: ['date', 'name', 'state', 'city', 'address', 'money', 'zip'],
          list: state.tableData2,
          multiHeader: [
            'Date',
            'Delivery Info',
            'Name',
            'Address Info',
            'State',
            'City',
            'Address',
            'Money(RMB)',
            'Zip',
          ],
          merges: [
            'A1:A3',
            'B1:F1',
            'B2:B3',
            'C2:F2',
            'C3:C3',
            'D3:D3',
            'E3:E3',
            'F3:F3',
            'G3:G3',
            'A4:A6',
          ],
          showSummary: state.formInline2.showSummary,
          summaryList: state.sums,
        },
      ]
      exportExcelSheet(exportData, {
        border: state.formInline2.border,
        autoWidth: state.formInline2.autoWidth,
        align: state.formInline2.align,
        stripe: state.formInline2.stripe,
      })
    }
    const getSummaries = (param: any) => {
      // console.log(param);
      const { columns, data } = param
      const sums: string[] = []
      columns.forEach((column: any, index: number) => {
        if (index === 0) {
          sums[index] = state.formInline2.sumText
          return
        }
        var substr = state.formInline2.showUnit
          ? column.label.substring(
              column.label.indexOf('(') + 1,
              column.label.indexOf(')'),
            )
          : ''
        const values = data.map((item: any) => Number(item[column.property]))
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] =
            Number(sums[index]).toFixed(state.formInline2.sumToFixed || 2) +
            ' ' +
            substr
        } else {
          sums[index] = state.formInline2.emptyText
        }
      })
      state.sums = sums
      return sums
    }
    return {
      ...toRefs(state),
      export2,
      getSummaries,
    }
  },
})
</script>
<style scoped lang="scss"></style>
