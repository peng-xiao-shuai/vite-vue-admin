<template>
  <div
    class="btn"
    :style="{ top: pageY + 'px' }"
    @mousemove="handleeMove"
    @mousedown="handleDown"
    @mouseup="handleUp"
    @click="handleClick"
  >
    <i class="el-icon-arrow-left"></i>
  </div>
  <update-drawer v-model:drawer="drawer"></update-drawer>
</template>

<script setup lang='ts'>
import updateDrawer from "./setting/drawer.vue";
import { ref } from "vue";

const drawer = ref(false);
const pageY = ref<number>(
  Number(window.localStorage.getItem("setting-enter")) || 90
);
// 是否可以拖到
let status = ref<boolean>(false);
// 是否可以点击
let isMove = ref<boolean>(false);
// 鼠标按下
const handleDown = () => {
  status.value = true;
};

// 松开鼠标
const handleUp = () => {
  window.localStorage.setItem("setting-enter", String(pageY.value));
  setTimeout(() => {
    isMove.value = false;
  });
  status.value = false;
};

// 鼠标悬浮
const handleeMove = (e: MouseEvent) => {
  if (status.value) {
    isMove.value = true;
    if (pageY.value >= 90) {
      if (pageY.value + 60 <= window.innerHeight) {
        status.value = true;
        pageY.value = e.clientY - 30;
      } else {
        status.value = false;
        pageY.value = window.innerHeight - 60;
      }
    } else {
      pageY.value = 100;

      //取消字段选择功能
      document.onselectstart = function () {
        return false;
      };
      handleUp();
    }
  }
};

const handleClick = () => {
  if (!isMove.value) drawer.value = true;
};
</script>

<style scoped lang='scss'>
.btn {
  width: 30px;
  height: 60px;
  border-radius: 5px 0 0 5px;
  position: fixed;
  right: 0;
  background: var(--color-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  cursor: move;
}
</style>