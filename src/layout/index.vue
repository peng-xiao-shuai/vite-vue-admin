<template>
  <div class="content">
    <div :class="['left']">
      <menus :collapse="collapse"></menus>
    </div>
    <div
      class="right"
      :style="
        !collapse
          ? { marginLeft: '65px', width: 'calc(100% - 65px)' }
          : {
              marginLeft:
                ($store.state.settings.drawerSetting.leftMargin || 200) + 'px',
              width: `calc(100% - ${
                $store.state.settings.drawerSetting.leftMargin || 200
              }px)`,
            }
      "
    >
      <div
        class="top"
        :style="{
          boxShadow:
            $store.state.settings.drawerSetting.fixed === 1
              ? '5px 5px 5px 0px rgba(0,0,0,0.1)'
              : '0 0 0 0',
          position:
            $store.state.settings.drawerSetting.fixed === 1
              ? 'sticky'
              : 'static',
          top: 0,
        }"
      >
        <navs @isCollapse="isCollapse" :collapse="collapse"></navs>
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
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    routerView,
    menus,
    navs,
    TagsView,
    setting
  },
  setup () {


    const store = useStore()
    let collapse = computed(() => !!store.state.settings.drawerSetting.defaultMenu)

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
    position: relative;
    right: 0;
    // overflow: hidden;
    transition: all 0.3s;

    .top {
      width: 100%;
      position: -webkit-sticky;
      position: sticky;
      z-index: 6;
      background: #fff;
      // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .view {
      width: 100%;
      background: #eff1f4;
      min-height: calc(100% - 90px);
      box-sizing: border-box;
      padding: 20px;
      overflow: hidden;
    }
  }
}
</style>