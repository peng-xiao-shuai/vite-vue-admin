<template>
  <div class="app-container">
    <el-card :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="viteIcon vitei" style="margin-right: 5px"></i>
          <span>图标</span>
        </div>
      </div>
      <div class="icons">
        <div v-for="(item, index) in icons" :key="index">
          <i :class="['viteIcon', item.icon]"></i>
          <div class="iconName">{{ item.name }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent, inject, nextTick } from "vue";
import defalutData from "/@/config/defalut-data";
export default defineComponent({
  name: "icons",
  setup() {
    let icons = ref(defalutData.iconArr);
    return {
      icons,
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
.icons {
  display: grid;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-columns: repeat(14, 1fr);
  > div {
    text-align: center;
    .viteIcon {
      font-size: 28px;
      color: #333;
    }
    .iconName {
      margin-top: 10px;
      font-size: 15px;
    }
  }
}
</style>
