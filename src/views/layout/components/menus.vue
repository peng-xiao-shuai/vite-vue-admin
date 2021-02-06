<template>
  <div class="menus">
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
      :collapse='!collapse'
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
            <i :class="[item.meta.icon,'viteIcon'] "></i>
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
              <el-menu-item :index="_index + '-' + idx">
                <i :class="[each.meta.icon,'viteIcon'] "></i>
                {{each.meta && each.meta.title}}</el-menu-item>
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
      console.log(menusSettin.children);
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
      menusSettin
    };
  },
};
</script>

<style>
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

.menus .viteIcon{
  font-size: 16px;
  /* border: 1px solid #fff; */
  color: #ccc;
  border-radius: 50%;
  padding: 5px;
}

.el-menu{
  border: none;
}

.el-submenu .el-menu-item{
  background: #1a294a !important;
  color: #ccc !important;
  /* background: v-bind(children); */
}

.el-submenu__title:hover,.el-menu-item:hover,.el-submenu__title:hover .viteIcon,.el-menu-item:hover .viteIcon{
  background: #182646 !important;
  color: #5874ae !important;
  transition: all .2s;
}
.el-menu-item:hover{
  background: #101a33 !important;

}
.el-submenu__title:hover .viteIcon,.el-menu-item:hover .viteIcon{
  background: #202e50 !important;
}

.el-submenu .el-menu-item{
  padding: 0 !important;
  padding-left: 40px !important;
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
