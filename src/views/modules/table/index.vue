<template>
  <div class="app-container">
    <el-card
      class="filter-container"
      :style="{ marginBottom: '20px' }"
      :shadow="defalutData.cardShadow"
    >
      <div class="operate-container">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
        </div>
        <div>
          <el-button
            style="float: right"
            type="primary"
            @click="getList()"
            size="small"
          >
            查询搜索
          </el-button>
          <el-button
            style="float: right; margin-right: 15px"
            @click="handleResetSearch()"
            size="small"
          >
            重置
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small">
          <div class="screenForm">
            <el-form-item label="用户名：">
              <el-input
                v-model="listQuery.name"
                placeholder="请输入用户名"
                style="width: 80%"
                clearable
              ></el-input>
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
            @click="handleAddMenu()"
            size="mini"
          >
            添加
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow">
      <div>
        <powerful-table
          ref="Table"
          :list="list.value"
          :header="config"
          :isSelect="true"
          :total="total"
          :tableName="'Table'"
          :operateData="operateData"
          :selectData="selectData.value"
          @batchOperate="handleBatchChange"
          @sizeChange="getList"
          @switchChange="handleSwitchChange"
          @update="handleUpdate"
          @remove="handleDelete"
          @sortCustom="handleSortCustom"
        >
        </powerful-table>
      </div>
    </el-card>
    <!-- 编辑区 -->
    <update
      v-model:dialog="isDialog"
      v-model:currentFrom="currentFrom.value"
      @refresh="getList"
    ></update>
  </div>
</template>

<script lang='ts'>
import { tableFun } from "/@/api/modules/table";
import { header } from "./indexData";
import { ref, reactive, defineComponent, inject, shallowReactive } from "vue";
import { useRouter, useRoute } from "vue-router";

// 组件
import update from "./components/update.vue";

export default defineComponent({
  name: "modulesTable",
  components: {
    update,
  },
  setup() {
    // const router = useRouter();
    // const route = useRoute();
    let $message = inject<any>("$message");

    let list = reactive<any>({ value: [] });

    let selectData = shallowReactive<any>({ value: [] });

    // 批量操作
    let operateData = {
      value: 0,
      operates: [
        {
          label: "推荐",
          value: 0,
        },
        {
          label: "取消推荐",
          value: 1,
        },
        {
          label: "删除",
          value: 2,
        },
      ],
    };

    // console.log(themeColor);

    let total = ref(0);
    let config = reactive(header);
    let listQuery = reactive<any>({
      pageNum: 1,
      pageSize: 10,
    });

    // 编辑区显隐
    let isDialog = ref(false);
    // 编辑区当前数据
    let currentFrom = reactive({ value: { parentId: 0, hidden: 0 } });

    getList();

    function handleAddMenu() {
      isDialog.value = true;
    }
    function getList(
      e?: {
        pageNum: number | string;
        pageSize: number | string;
      },
      selectArr?: any
    ) {
      // 获取选中
      selectData.value = selectArr ? selectArr : [];

      Object.assign(listQuery, e ? e : {});
      tableFun(listQuery).then((response: any) => {
        list.value = response.data.list;
        total.value = response.data.total;
      });
    }
    function handleSortCustom(e: any) {
      console.log("远程搜索", e);
      listQuery[e.prop] = e.order;
      getList();
    }
    function handleSwitchChange(row: any, index: number) {
      list.value[index] = row;
      $message.success("修改成功");
    }
    function handleUpdate(row: any, index: number) {
      isDialog.value = true;

      currentFrom.value = reactive(JSON.parse(JSON.stringify(row)));
      console.log(row);
    }

    function handleBatchChange(
      ids: any,
      item: { label: string; value: number },
      items: any
    ) {
      console.log(ids, item, items);
      switch (item.value) {
        case 0:
        case 1:
          list.value.forEach((each: any, index: number) => {
            if (ids.indexOf(each.id) !== -1) {
              if (item.value === 0) {
                each.recommend = 1;
              } else {
                each.recommend = 0;
              }
            }
          });
          $message.success("修改成功");

          break;
        case 2:
          delect(ids);
          break;
      }
    }

    function handleDelete(row: any, index: number) {
      delect([row.id]);
    }

    function delect(ids: any) {
      list.value = list.value.filter((item: any) => ids.indexOf(item.id) == -1);
      $message.success("删除成功");
    }

    return {
      // 变量
      list,
      total,
      config,
      operateData,
      listQuery,
      isDialog,
      currentFrom,
      selectData,

      // 方法
      handleAddMenu,
      getList,
      handleSwitchChange,
      handleBatchChange,
      handleUpdate,
      handleDelete,
      handleSortCustom,
    };
  },
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
