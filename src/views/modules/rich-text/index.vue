<template>
  <div class="app-container">
    <el-card :style="{ marginBottom: '20px' }" :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="viteIcon viteZJ-fuwenben" style="margin-right: 5px"></i>
          <span>富文本编辑器</span>
        </div>
      </div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow">
      <div class="lineTinyBox">
        <tiny-mce
          :width="'100%'"
          :height="700"
          :myValue="myValue"
          ref="tinymce"
        ></tiny-mce>

        <div class="phoneBox">
          <el-scrollbar style="height: 667px" class="vHtml">
            <div v-html="myValue"></div>
          </el-scrollbar>
        </div>
      </div>
    </el-card>
    <!-- 编辑区 -->
    <!-- <update
      v-model:dialog="isDialog"
      v-model:currentFrom="currentFrom.value"
      @refresh="getList"
    ></update> -->
  </div>
</template>

<script lang='ts'>
import { richTextFun } from "/@/api/modules/richText";
import { ref, reactive, defineComponent, inject } from "vue";
import { useRouter, useRoute } from "vue-router";

// 组件
// import update from "./components/update.vue";
import tinyMce from "/@/components/tiny-mce/index.vue";

export default defineComponent({
  name: "rich-text",
  components: {
    tinyMce,
    // update,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    let myValue = ref<any>("");
    // 编辑区显隐
    let isDialog = ref(false);
    // 编辑区当前数据
    let currentFrom = reactive({ value: { parentId: 0, hidden: 0 } });

    getData();

    function getData() {
      richTextFun().then((response: any) => {
        myValue.value = response.data;
      });
    }
    function handleSwitchChange(row: any, index: number) {
      // modifyEnterprise(row.id, { hidden: row.hidden }).then((response: any) => {
      //   (inject("$message") as any)({
      //     message: "修改成功",
      //     type: "success",
      //     duration: 1000,
      //   });
      // });
    }

    return {
      // 变量
      currentFrom,
      myValue,

      // 方法
    };
  },
});
</script>

<style scoped lang='scss'>
.operate-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lineTinyBox {
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 20px;

  .phoneBox {
    display: flex;
    width: 375px;
    border: 4px solid #000;
    border-radius: 30px;
    padding: 38px 0 0;
    justify-content: center;
    position: relative;
    overflow: hidden;
    margin: auto;

    &::before {
      position: absolute;
      left: calc(50% - 25%);
      top: -25px;
      content: " ";
      display: block;
      background: #000;
      width: 50%;
      height: 50px;
      border-radius: 25px;
    }

    .vHtml {
      background: #fff;
      width: 375px;
      padding: 0 10px;
      box-sizing: border-box;
      border-bottom-left-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}
</style>
