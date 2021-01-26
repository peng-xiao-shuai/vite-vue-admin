<template>
  <div class="menus">
    <!-- @open="handleOpen" -->
      <!-- @close="handleClose" -->
      <!-- :collapse="isCollapse" -->

    <el-menu
      class="el-menu-vertical-demo"
    >
      <template v-for="(item, _index) in menus" :key="item.name">
        <el-submenu :index="String(_index)" v-if="!item.hidden">
          <template #title>
            <i class="el-icon-location"></i>
            <span>
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
export default {
  name: "menus",
  setup() {
    function navTo(e) {
      router.push({
        name: e
      });
    }

    function outlogin() {
      store.dispatch("outLoing");
    }

    let menus = store.state.user.menus;
    console.log(menus);

    return {
      navTo,
      outlogin,

      menus,
    };
  },
};
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
