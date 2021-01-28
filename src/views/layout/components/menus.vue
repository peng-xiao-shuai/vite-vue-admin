<template>
  <div class="menus" :style="{width: collapse ? '64px' : 'auto'}">
    <!-- @open="handleOpen" -->
      <!-- @close="handleClose" -->

    <!-- <el-image
      :style="{width: '100%'}"
      :src="menusSettin.url"
      :fit="'cover'"
      :preview-src-list="[menusSettin.url]">
    </el-image> -->

    <div class="menus-logo">
      VITE
    </div>

    <el-menu
      :collapse='collapse'
      :mode='menusSettin.mode'
      :background-color='menusSettin.backgroundColor'
      :text-color='menusSettin.textColor'
      :active-text-color='menusSettin.activeTextColor'
      :collapse-transition='menusSettin.collapseTransition'
      class="el-menu-vertical-demo"
    >
      <template v-for="(item, _index) in menus" :key="item.name">
        <el-submenu :index="String(_index)" v-if="!item.hidden" :show-timeout='100' :hide-timeout='100'>
          <template #title>
            <i class="el-icon-location metaTitle"></i>
            <span class="metaTitle">
              {{
                (item.meta && item.meta.title) ||
                (item.children && item.children[0].meta.title) ||
                ""
              }}
            </span>
          </template>
          <template v-for="(each,idx) in item.children" :key='idx'>
            <el-menu-item-group
              v-if="!each.hidden"
               class="children"
              @click='navTo(each.path)'
            >
              <el-menu-item :index="_index + '-' + idx">{{each.meta && each.meta.title}}</el-menu-item>
            </el-menu-item-group>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import router from "/@/router/index";
import store from "/@/store/index";

import { menusSettin } from '/@/config/assets-data';
export default {
  name: "menus",
  props:{
    collapse:{
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    function navTo(e) {
      router.push({
        name: e
      });
    }

    // watch(collapse,(val)=>{
      console.log(props.collapse);
    // })

    function outlogin() {
      store.dispatch("outLoing");
    }

    let menus = store.state.user.menus;
    console.log(menus);

    return {
      navTo,
      outlogin,

      menus,
      menusSettin,
    };
  },
};
</script>

<style lang="scss">
.menus-logo{
  box-sizing: border-box;
  padding: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  width:100%;background:#1CC9B5;height: 50px;color:#fff;text-align:center;line-height: 30px
}
.menus{
  min-width: 60px;
  overflow: hidden;
  min-height: 100vh;
  background: #20335D;
}
.el-submenu .el-menu-item{
  padding: 0 !important;
  padding-left: 60px !important;
}
.el-menu-item-group__title{
  padding: 0 !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  background: #20335D;
  min-height: 100%;
}
</style>
