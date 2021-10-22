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
    <el-form :inline="true" :model="formInline1" size="mini">
      <el-form-item label="副标题：">
        <el-input
          v-model="formInline1.subtitle"
          placeholder="副标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="对其方式：">
        <el-select
          v-model="formInline1.align"
          placeholder="对其方式"
          style="width: 100px"
        >
          <el-option label="靠左" value="left"></el-option>
          <el-option label="居中" value="center"></el-option>
          <el-option label="靠右" value="right"></el-option>
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
          <el-button
            type="primary"
            icon="el-icon-top"
            size="mini"
            @click="export1"
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
    <div class="tipBox">
      复杂表格导出
      <div style="font-size: 13px; color: var(--el-color-info)">
        （多级表头，合计）
      </div>
    </div>
    <el-form :inline="true" :model="formInline2" size="mini">
      <el-form-item label="对其方式：">
        <el-select
          v-model="formInline2.align"
          placeholder="对其方式"
          style="width: 100px"
        >
          <el-option label="靠左" value="left"></el-option>
          <el-option label="居中" value="center"></el-option>
          <el-option label="靠右" value="right"></el-option>
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
          ></el-input>
        </el-form-item>

        <el-form-item label="无数据文本内容：">
          <el-input
            style="width: 100px"
            v-model="formInline2.emptyText"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button-group>
          <!-- <el-button type="primary" icon="el-icon-bottom" size="mini">导入</el-button> -->
          <el-button
            type="primary"
            icon="el-icon-top"
            size="mini"
            @click="export2"
            >导出</el-button
          >
        </el-button-group>
      </el-form-item>
    </el-form>
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
    <p></p>
    <div class="tipBox">
      多表格导出
      <div style="font-size: 13px; color: var(--el-color-info)">
        （一次导出上面两个表格，通过xlsx文档下面sheet页签切换）
      </div>
    </div>
    <el-button-group>
      <!-- <el-button type="primary" icon="el-icon-bottom" size="mini">导入</el-button> -->
      <el-button type="primary" icon="el-icon-top" size="mini" @click="export3"
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

    <powerful-table :list="list" :header="config" :isPagination="false">
    </powerful-table>
  </div>
</template>

<script lang='ts'>
import { header, lists } from "./indexData";
import {
  ref,
  reactive,
  defineComponent,
  inject,
  nextTick,
  toRefs,
  onMounted,
} from "vue";
import { exportExcelSheet } from "@/utils/export";
import { tableData1, tableData2 } from "./indexData";

export default defineComponent({
  name: "icons",
  components: {},
  setup() {
    const multipleTable = ref();
    const state = reactive({
      tableData1: tableData1,
      formInline1: {
        subtitle: "XXX系统",
        align: "center",
        border: true,
        autoWidth: true,
        stripe: false,
      },
      tableData2: tableData2,
      formInline2: {
        align: "center",
        border: true,
        autoWidth: true,
        stripe: false,
        showSummary: true,
        showUnit: true,
        sumToFixed: 2,
        sumText: "Total Cost",
        emptyText: "-",
      },
      sums: [""],
    });

    let list = ref(lists);
    let config = reactive(header);
    const export1 = () => {
      const exportData = [
        {
          header: ["Date", "Name", "Address"],
          prop: ["date", "name", "address"],
          list: state.tableData1,
          multiHeader: [state.formInline1.subtitle],
        },
      ];
      exportExcelSheet(exportData, {
        border: state.formInline1.border,
        autoWidth: state.formInline1.autoWidth,
        align: state.formInline1.align,
        stripe: state.formInline1.stripe,
      });
    };
    const export2 = () => {
      const exportData = [
        {
          // header: ["Date", "Name", "State", "City", "Address", "Zip"],
          prop: ["date", "name", "state", "city", "address", "money", "zip"],
          list: state.tableData2,
          multiHeader: [
            "Date",
            "Delivery Info",
            "Name",
            "Address Info",
            "State",
            "City",
            "Address",
            "Money(RMB)",
            "Zip",
          ],
          merges: [
            "A1:A3",
            "B1:F1",
            "B2:B3",
            "C2:F2",
            "C3:C3",
            "D3:D3",
            "E3:E3",
            "F3:F3",
            "G3:G3",
          ],
          showSummary: state.formInline2.showSummary,
          summaryList: state.sums,
        },
      ];
      exportExcelSheet(exportData, {
        border: state.formInline2.border,
        autoWidth: state.formInline2.autoWidth,
        align: state.formInline2.align,
        stripe: state.formInline2.stripe,
      });
    };
    const export3 = () => {
      const exportData = [
        {
          // header: ["Date", "Name", "State", "City", "Address", "Zip"],
          prop: ["date", "name", "state", "city", "address", "money", "zip"],
          list: state.tableData2,
          multiHeader: [
            "Date",
            "Delivery Info",
            "Name",
            "Address Info",
            "State",
            "City",
            "Address",
            "Money(RMB)",
            "Zip",
          ],
          merges: [
            "A1:A3",
            "B1:F1",
            "B2:B3",
            "C2:F2",
            "C3:C3",
            "D3:D3",
            "E3:E3",
            "F3:F3",
            "G3:G3",
          ],
          border: state.formInline2.border,
          autoWidth: state.formInline2.autoWidth,
          align: state.formInline2.align,
          stripe: state.formInline2.stripe,
          showSummary: state.formInline2.showSummary,
          summaryList: state.sums,
        },
        {
          header: ["Date", "Name", "Address"],
          prop: ["date", "name", "address"],
          list: state.tableData1,
          multiHeader: [state.formInline1.subtitle],
          border: state.formInline1.border,
          autoWidth: state.formInline1.autoWidth,
          align: state.formInline1.align,
          stripe: state.formInline1.stripe,
        },
      ];
      exportExcelSheet(exportData, { fileName: "多表导出" });
    };
    const getSummaries = (param: any) => {
      // console.log(param);
      const { columns, data } = param;
      const sums: string[] = [];
      columns.forEach((column: any, index: number) => {
        if (index === 0) {
          sums[index] = state.formInline2.sumText;
          return;
        }
        var substr = state.formInline2.showUnit
          ? column.label.substring(
              column.label.indexOf("(") + 1,
              column.label.indexOf(")")
            )
          : "";
        const values = data.map((item: any) => Number(item[column.property]));
        if (!values.every((value: any) => isNaN(value))) {
          sums[index] = values.reduce((prev: any, curr: any) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] =
            Number(sums[index]).toFixed(state.formInline2.sumToFixed || 2) +
            " " +
            substr;
        } else {
          sums[index] = state.formInline2.emptyText;
        }
      });
      state.sums = sums;
      return sums;
    };
    onMounted(() => {});
    return {
      list,
      config,
      multipleTable,
      onMounted,
      export1,
      export2,
      export3,
      getSummaries,
      ...toRefs(state),
    };
  },
});
</script>

<style scoped lang='scss'>
.tipBox {
  font-size: 15px !important;

  .code {
    border-radius: 5px;
    padding: 0 5px;
    color: #666;
    background: #ddd;
  }
}
</style>
