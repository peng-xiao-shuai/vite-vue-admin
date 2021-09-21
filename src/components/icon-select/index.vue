<template>
  <div class="app-container">
    <el-select
      filterable
      remote
      :remote-method="remoteMethod"
      v-model="iconValue"
      placeholder="请选择图标"
      @change="change"
      :style="style"
    >
      <template #prefix>
        <div :style="{ color: themeColor }">
          <i :class="[defaultData.iconfont, iconValue]"></i>
        </div>
      </template>
      <div
        class="icons"
        :style="{
          'grid-template-columns': `repeat(${columnNumber || 8}, 1fr)`,
        }"
      >
        <el-option
          v-for="item in options"
          :key="item.icon"
          :label="item.name"
          :value="item.icon"
        >
          <div class="item">
            <i :class="[defaultData.iconfont, item.icon]"></i>
            <div class="iconName">{{ item.name }}</div>
          </div>
        </el-option>
      </div>
    </el-select>

    <!-- <el-card :shadow="defaultData.cardShadow">
      <div class="operate-container">
        <div>
          <i :class="[defaultData.iconfont,'vitei']" style="margin-right: 5px"></i>
          <span>图标</span>
        </div>
      </div>
      <div class="icons">
        <div v-for="(item, index) in icons" :key="index">
          <i :class="[defaultData.iconfont, item.icon]"></i>
          <div class="iconName">{{ item.name }}</div>
        </div>
      </div>
    </el-card> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watchEffect } from "vue";
import icon from "@/styles/iconfont.css";

export default defineComponent({
  name: "icons",
  emits: ["update:icon"],
  props: {
    /**
     * 一排多少个
     */
    columnNumber: Number,
    icon: {
      type: String,
      default: "",
    },
    /**
     * 样式
     */
    style: {
      type: Object,
      default: () => {
        return {
          width: "100%",
        };
      },
    },
  },
  setup(props, { emit }) {
    // 获取所有的 class名
    const array = [...icon.matchAll(/\.(\w|\-)*\:/g)].map(
      (item: string, index: number) => {
        return item[0].substr(1, item[0].length).slice(0, -1);
      }
    );

    const iconValue = ref<string>("");
    watchEffect(() => {
      if (props.icon != "") {
        iconValue.value = props.icon;
        console.log(props.icon);
      }
    });

    // 获取所有 名称 并且合并
    const icons = [
      ...icon.matchAll(/\/\*(\s)(\w*|[^\x00-\xff]*)(\s)\*\//g),
    ].map((item: string[], index: number) => ({
      name: item[2],
      icon: array[index],
    }));

    interface icon {
      name: string;
      icon: string;
    }

    const options = ref<icon[]>(icons);

    const change = (e: string) => {
      emit("update:icon", e);
    };

    // 搜索
    const remoteMethod = (e: string) => {
      options.value = icons.filter(
        (_: icon) => _.icon.indexOf(e) !== -1 || _.name.indexOf(e) !== -1
      );
    };

    return {
      options,
      iconValue,
      change,
      remoteMethod,
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
  padding: 5px 10px;
  display: grid;
  grid-row-gap: 5px;
  grid-column-gap: 5px;
  :deep() .el-select-dropdown__item {
    height: auto;
    line-height: auto;
    padding: 0;
  }
  .item {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0);
    color: #999;
    border-radius: 5px;
    height: 60px;
    transition: all 0.4s;
    padding: 5px 10px;

    .viteIcon {
      font-size: 20px;
    }
    .iconName {
      // margin-top: 10px;
      font-size: 12px;
    }
  }

  .item:hover {
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    box-shadow: 0 0 2px 0 var(--color-primary);
  }
}
</style>
