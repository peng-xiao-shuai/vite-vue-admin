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
import icon from "/@/style/iconfont.css";

export default defineComponent({
  name: "icons",
  setup() {
    // 获取所有的 class名
    const array = [...icon.matchAll(/\.(\w|\-)*\:/g)].map(
      (item: any, index: number) => {
        return item[0].substr(1, item[0].length).slice(0, -1);
      }
    );

    // 获取所有 名称 并且合并
    const icons = [
      ...icon.matchAll(/\/\*(\s)(\w*|[^\x00-\xff]*)(\s)\*\//g),
    ].map((item: any, index: number) => ({
      name: item[2],
      icon: array[index],
    }));

    return {
      icons,
    };
  },
});
</script>

<style scoped lang='scss'>
@import "../../style/common/var.scss";
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
  grid-template-columns: repeat(13, 1fr);
  > div {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0);
    color: #333;
    border-radius: 5px;
    transition: all 0.4s;
    padding: 5px 0;

    .viteIcon {
      font-size: 28px;
    }
    .iconName {
      margin-top: 10px;
      font-size: 15px;
    }
  }

  > div:hover {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    box-shadow: 0 0 2px 0 var(--color-primary);
  }
}
</style>
