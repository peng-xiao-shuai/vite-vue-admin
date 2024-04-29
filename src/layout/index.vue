<template>
  <el-config-provider
    :size="defaultData.navSetting.size || 'small'"
    :locale="locale"
  >
    <div class="content">
      <div :class="['left']">
        <menus :collapse="collapse" />
      </div>
      <div
        class="right"
        :style="
          !collapse
            ? { marginLeft: '65px', width: 'calc(100% - 65px)' }
            : {
                marginLeft: (drawerSetting.leftMargin || 200) + 'px',
                width: `calc(100% - ${drawerSetting.leftMargin || 200}px)`,
              }
        "
      >
        <div
          class="top"
          :style="{
            boxShadow:
              drawerSetting.fixed === 1
                ? '5px 5px 5px 0px rgba(0,0,0,0.1)'
                : '0 0 0 0',
            position: drawerSetting.fixed === 1 ? 'sticky' : 'static',
            top: 0,
          }"
        >
          <navs @is-collapse="isCollapse" :collapse="collapse" />
          <tags-view :collapse="collapse" v-if="drawerSetting.isTagsView" />
        </div>
        <div
          class="view"
          id="view"
          v-press-key:s="
            () => {
              $throttle(settingStore.$patch, 100, [
                (state: typeof settingStore) => {
                  state.isSearch = true
                },
              ])
            }
          "
          :style="{
            height: `calc(100% - ${
              drawerSetting.isTagsView ? '91px' : '50px'
            })`,
          }"
        >
          <setting />

          <transition name="searchView">
            <search-view v-show="settingStore.isSearch" class="search-view" />
          </transition>

          <transition name="searchView">
            <el-scrollbar
              style="height: 100%"
              v-show="!settingStore.isSearch"
              v-press-key:escape="
                () =>
                  $throttle(settingStore.$patch, 100, [
                    (state: typeof settingStore) => {
                      state.isSearch = false
                    },
                  ])
              "
            >
              <router-view v-if="!meta.iframeUrl" />
              <iframe
                v-else
                :src="meta.iframeUrl"
                frameborder="0"
                v-bind="{ ...(meta.iframeData || {}) }"
              ></iframe>
            </el-scrollbar>
          </transition>
        </div>
      </div>
    </div>
  </el-config-provider>
</template>

<script lang="ts">
import TagsView from './components/tags-view.vue'
import menus from './components/menus.vue'
import navs from './components/navs.vue'
import routerView from './components/router-view.vue'
import SearchView from './components/search-view.vue'
import setting from './components/setting.vue'

import { useSettingStore } from '@/stores/index'
import { useRoute } from 'vue-router'
import defaultData from '@/config/default-data'
import cn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export default defineComponent({
  components: {
    SearchView,
    routerView,
    menus,
    navs,
    TagsView,
    setting,
  },
  setup() {
    const settingStore = useSettingStore()
    const drawerSetting = settingStore.drawerSetting
    const route = useRoute()
    const collapse = computed(() => !!drawerSetting.defaultMenu)
    const meta = computed(() => route.meta)
    const locale = ref(defaultData.navSetting.locale === 'zh-CN' ? cn : en)

    const isCollapse = (e: boolean) => {
      settingStore.drawerSetting['defaultMenu'] = e ? 1 : 0
    }

    return {
      drawerSetting,
      collapse,
      isCollapse,
      meta,
      locale,
      settingStore,
    }
  },
})
</script>

<style lang="scss" scoped>
.fadeRouter-leave-active,
.fadeRouter-enter-active {
  transition: all 0.4s;
}

.fadeRouter-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.fadeRouter-enter-to,
.fadeRouter-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fadeRouter-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.content {
  min-height: 100vh;
  display: flex;
  justify-content: space-between;
  .left {
    height: 100%;
    max-width: 200px;
    // position: fixed;
    // left: 0;
    // top: 0;
  }
  .right {
    // flex: 1;
    position: relative;
    right: 0;
    max-height: 100vh;
    // overflow: hidden;
    transition: var(--el-transition-duration);

    .top {
      width: 100%;
      position: -webkit-sticky;
      position: sticky;
      z-index: 6;
      background: var(--el-bg-color-overlay);
      transition: var(--el-transition-duration);
      // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .view {
      width: 100%;
      background: var(--el-fill-color);
      transition: var(--el-transition-duration);
      box-sizing: border-box;
      padding: var(--system-padding);
      overflow: hidden;
      position: relative;

      .search-view {
        height: calc(100% - var(--system-padding) * 2);
        width: calc(100% - var(--system-padding) * 2);
        position: absolute;
      }
    }
  }
}
</style>
