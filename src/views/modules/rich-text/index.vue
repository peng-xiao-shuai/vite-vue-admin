<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div>
          <i :class="[defaultData.iconfont,'viteZJ-fuwenben']" style="margin-right: 5px"></i>
          <span>富文本编辑器</span>
        </div>
      </div>
      <div class="lineTinyBox">
        <tiny-mce :width="'100%'" v-model="myValue" :height="667" :url="'图片路径'" ref="tinymce" :slotStyle="{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px 0 0',
          }">
          <template #default>
            <el-button type="primary" @click="getTinyMceFun()">
              确认
            </el-button>
          </template>
        </tiny-mce>

        <div class="phoneBox">
          <el-scrollbar style="height: 667px" class="vHtml" ref="scroll">
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
import { richTextFun } from "@/api/modules/richText";
import { ref, reactive, defineComponent, inject } from "vue";

// 组件
// import update from "./components/update.vue";
import tinyMce from "@/components/tiny-mce/index.vue";

export default defineComponent({
  name: "modulesRichText",
  components: {
    tinyMce,
    // update,
  },
  setup() {
    let myValue = ref<string>("");
    let scroll = ref(null);

    getData();

    function getData() {
      richTextFun().then((response) => {
        myValue.value = response.data;
      });
    }
    function getTinyMceFun() {
      console.log("获取富文本数据", myValue.value);
    }

    return {
      // 变量
      myValue,

      // 方法
      getTinyMceFun,
      scroll,
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
