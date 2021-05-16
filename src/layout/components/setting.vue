<template>
  <div
    class="btn"
    :style="{ top: pageY + 'px' }"
    @click="handleClick"
    @mousedown="handleDown"
    @mouseup="handleUp"
    @mousemove="handleeMove"
  >
    <i class="el-icon-arrow-left"></i>
  </div>
  <update-drawer v-model:drawer="drawer"></update-drawer>
</template>

<script setup lang=ts>
import updateDrawer from "./setting/drawer.vue";
import { ref } from "vue";

const drawer = ref(false);
const pageY = ref<number>(
  Number(window.localStorage.getItem("setting-enter")) || 90
);
// let mouseY = ref(0);
let status = false;
// 鼠标按下
const handleDown = (e: any) => {
  // mouseY.value = e.offsetY;
  status = true;
};
// 鼠标悬浮
const handleeMove = (e: any) => {
  if (status) {
    // console.log("e :>> ", e);
    if (pageY.value >= 90) {
      // console.log(window.innerHeight, pageY.value);
      if (pageY.value + 60 <= window.innerHeight) {
        status = true;
        pageY.value = e.pageY - 30;
      } else {
        status = false;
        pageY.value = window.innerHeight - 60;
      }
    } else {
      status = false;
      pageY.value = 90;
    }
  }
};
// 松开鼠标
const handleUp = (e: any) => {
  window.localStorage.setItem("setting-enter", String(pageY.value));
  status = false;
};
const handleClick = () => {
  drawer.value = true;
};
</script>

<style scoped lang='scss'>
@import "../../style/mixins/function.scss";

.btn {
  width: 30px;
  height: 60px;
  border-radius: 5px 0 0 5px;
  position: fixed;
  right: 0;
  background: set-color(primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}
</style>