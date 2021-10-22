<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name></view-name>

      <div class="operate-container">
        <icon-select v-model:icon="iconVal"></icon-select>
      </div>

      <div class="icons">
        <div class="i-icon" v-for="(item, index) in icons" :key="index">
          <i :class="[defaultData.iconfont, item.icon]"></i>
          <div class="iconName">{{ item.name }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent, inject, nextTick } from "vue";
import iconSelect from "@/components/icon-select/index.vue";
import icon from "@/styles/iconfont.css";

export default defineComponent({
  name: "icons",
  components: {
    iconSelect,
  },
  setup() {
    // 获取所有的 class名
    const array = [...icon.matchAll(/\.(\w|\-)*\:/g)].map(
      (item: string[], index: number) => {
        return item[0].substr(1, item[0].length).slice(0, -1);
      }
    );

    // 获取所有 名称 并且合并
    const icons = [
      ...icon.matchAll(/\/\*(\s)(\w*|[^\x00-\xff]*)(\s)\*\//g),
    ].map((item: string[], index: number) => ({
      name: item[2],
      icon: array[index],
    }));

    console.log(icons);

    const iconVal = ref("");

    return {
      icons,
      iconVal,
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
  grid-template-columns: repeat(13, 1fr);
  .i-icon {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0);
    color: #666;
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
}
</style>
