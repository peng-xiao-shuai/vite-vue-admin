<template>
  <div
    class="menus"
    :style="{
      width: !collapse
        ? '65px'
        : ($store.state.settings.drawerSetting.leftMargin || 200) + 'px',
    }"
  >
    <menus-logo
      :collapse="collapse"
      v-if="$store.state.settings.drawerSetting.isLogo"
    ></menus-logo>

    <el-scrollbar style="height: calc(100vh - 50px)">
      <el-menu
        :collapse="!collapse"
        mode="vertical"
        :default-active="menuActive"
        class="el-menu-vertical-demo"
      >
        <menus-item
          :index="Number(index) + 1"
          :collapse="!collapse"
          v-for="(item, index) in $store.state.user.menus"
          :key="item.name"
          :item="item"
          :count="1"
        ></menus-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang='ts'>
// 组件
import menusLogo from "./menus-logo.vue";
import menusItem from "./menus-item.vue";
import { useRoute } from "vue-router";
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: "menus",
  components: {
    menusLogo,
    menusItem,
  },
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    const route = useRoute();
    const menuActive = computed(() => route.name)
    return {
      menuActive
    };
  },
})
</script>

<style lang='scss'>
.element::-webkit-scrollbar {
  width: 0 !important;
}
.menus {
  min-width: 65px;
  overflow: hidden;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s;
}

.clear {
  min-width: 65px;
  height: 100vh;
}

.menus .viteIcon {
  font-size: 16px;
  // color: $--menus-submenu-title-color;
  border-radius: 50%;
  padding: 5px;
}

.el-menu {
  border: none !important;
  box-sizing: border-box;
}
.el-menu > div {
  border: none !important;
}

.el-submenu .el-menu-item {
  border: none !important;
  box-sizing: border-box;
  // background: $--menus-children-background !important;
  color: #ccc;
  overflow: hidden;
  padding-right: 20px !important;
}
// 菜单背景色
.el-menu-item,
.el-submenu__title,
.menus {
  overflow: hidden;
  // background: $--menus-background !important;
}

.el-menu-item a {
  display: inline-block;
  width: 100%;
  // color: $--menus-submenu-title-color;
  text-overflow: ellipsis;
  overflow-x: hidden;
  text-decoration: none;
}
</style>
