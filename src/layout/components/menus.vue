<template>
  <div
    class="menus"
    :style="{
      width: !collapse ? '65px' : (drawerSetting.leftMargin || 200) + 'px',
    }"
  >
    <menus-logo :collapse="collapse" v-if="drawerSetting.isLogo" />

    <el-scrollbar style="height: calc(100vh - 50px)">
      <el-menu
        :collapse="!collapse"
        mode="vertical"
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        @select="() => {}"
        @open="() => {}"
        @close="() => {}"
      >
        <menus-item
          :index="Number(index) + 1"
          :collapse="!collapse"
          v-for="(item, index) in menus"
          :key="item.name"
          :item="item"
          :count="1"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
// 组件
import menusLogo from './menus-logo.vue'
import menusItem from './menus-item.vue'
import { useRoute } from 'vue-router'
import { defineComponent, computed, ComputedRef } from 'vue'
import { useSettingStore, useUserStore } from '@/stores'

export default defineComponent({
  name: 'Menus',
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
    const settingStore = useSettingStore()
    const userStore = useUserStore()
    const route = useRoute()
    const drawerSetting = computed(() => settingStore.drawerSetting)
    const menus = computed(() => userStore.menus)
    const menuActive = computed(() => route.name) as ComputedRef<
      string | undefined
    >
    return {
      menus,
      drawerSetting,
      menuActive,
    }
  },
})
</script>

<style lang="scss" scoped>
.element::-webkit-scrollbar {
  width: 0 !important;
}
.menus {
  overflow: hidden;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  :deep(.el-scrollbar__view) {
    height: 100%;
  }
  // transition: width 0.3s;
  :deep(.el-menu) {
    height: 100%;
    background: var(--el-bg-color-overlay);
    transition: var(--el-transition-duration);
    border: none;
  }

  :deep(.el-menu--collapse) {
    .el-icon.el-sub-menu__icon-arrow {
      display: none;
    }
  }
}
</style>
