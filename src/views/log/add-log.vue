<template>
  <el-card :shadow="defaultData.cardShadow">
    <view-name></view-name>

    <div style="margin: 15px 0">
      <el-form :inline="true" :model="addQuery">
        <div class="screenForm">
          <el-form-item>
            <el-input
              v-model="addQuery.info"
              placeholder="请输入问题信息"
              style="width: 80%"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="url">
            <el-input
              v-model="addQuery.url"
              placeholder="请输入问题地址"
              style="width: 80%"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item prop="error">
            <el-input
              v-model="addQuery.error"
              placeholder="请输入问题详情"
              style="width: 80%"
              clearable
            ></el-input>
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
      :header="config"
      :isPagination="false"
      isSelect
      :operateData="operateData"
      @batchOperate="handleBatchChange"
    >
    </powerful-table>

    <div style="margin: 15px 0">历史问题</div>

    <powerful-table
      ref="Table"
      :list="list"
      :header="config"
      :total="total"
      @sizeChange="getList"
    >
    </powerful-table>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from "vue";
import { parseTime } from "@/utils/parse-time";
import { header } from "./indexData";
import { getLogList } from "@/api/other";
import { useStore } from "vuex";

export default defineComponent({
  name: "error-log",
  setup(props, context) {
    const store = useStore();
    const total = ref(0);
    const list = ref([]);
    const sList = store.getters.getBugs;

    const listQuery = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    const operateData = reactive({
      value: 0,
      operates: [
        {
          label: "上传",
          value: 0,
        },
      ],
    });
    const addQuery = reactive({
      url: "",
      info: "",
      error: "",
      // 手动添加的type 为 info
      type: "Info",
      name: store.state.user.userInfo.username,
      time: parseTime(new Date()),
    });

    type E = {
      pageSize: number,
      pageNum: number
    }
    const getList = (e?: E) => {
      Object.assign(listQuery, e ? e : {});
      getLogList(listQuery).then((res) => {
        list.value = res.data.list;
        total.value = res.data.total;
      });
    };
    getList();
    const handleBatchChange = (e: any) => {
      console.log("上传");
    };
    const addLog = () => {
      store.commit("setErrorLog", JSON.parse(JSON.stringify(addQuery)));
    };

    return {
      list,
      sList,
      operateData,
      addQuery,
      total,

      handleBatchChange,
      addLog,
      getList,
      config: header,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>