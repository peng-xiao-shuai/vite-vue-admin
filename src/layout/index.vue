<template>
  <div class="content">
    <div :class="['left']">
      <menus :collapse="collapse"></menus>
    </div>
    <div
      class="right"
      :style="!collapse ? { marginLeft: '65px' } : { marginLeft: '200px' }"
    >
      <!-- 站位 -->
      <div
        :style="{
          height: $store.state.settings.drawerSetting.isTagsView
            ? '90px'
            : '50px',
        }"
        v-if="$store.state.settings.drawerSetting.fixed"
      ></div>
      <div
        class="top"
        :style="{
          position:
            $store.state.settings.drawerSetting.fixed === 1
              ? 'fixed'
              : 'sticky',
          top: 0,
        }"
      >
        <navs @isCollapse="isCollapse"></navs>
        <tags-view
          :collapse="collapse"
          v-if="$store.state.settings.drawerSetting.isTagsView"
        ></tags-view>
      </div>
      <div class="view">
        <setting></setting>

        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TagsView from './components/TagsView.vue'
import menus from './components/menus.vue'
import navs from './components/navs.vue'
import routerView from './components/router-view.vue'
import setting from './components/setting.vue'

import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    routerView,
    menus,
    navs,
    TagsView,
    setting
  },
  setup () {
    let collapse = ref(true)

    function isCollapse (e) {
      collapse.value = e
    }
    return {
      collapse,
      isCollapse,
    }
  }
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
    width: 100%;
    overflow: hidden;
    transition: margin-left 0.3s;

    .top {
      width: 100%;
      position: sticky;
      z-index: 6;
      background: #fff;
      // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .view {
      background: #eff1f4;
      min-height: calc(100% - 90px);
      position: relative !important;
      padding: 20px;
    }
  }
}
</style>