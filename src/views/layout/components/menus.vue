<template>
  <div class="menus" :style="{width:!collapse ? '65px' : '200px',background:menusSettin.backgroundColor}">

    <menus-logo :collapse='collapse'></menus-logo>

    <el-scrollbar style="height:calc(100vh - 50px)">
      <el-menu
        :collapse='!collapse'
        :mode='menusSettin.mode'
        :background-color='menusSettin.backgroundColor'
        :text-color='menusSettin.textColor'
        :active-text-color='menusSettin.activeTextColor'
        :collapse-transition='menusSettin.collapseTransition'
        class="el-menu-vertical-demo"
        @select='select'
      >
        <!-- :default-active='' -->

        <menus-item :collapse='!collapse' v-for="(item,index) in menus" :key="item.name" :item='item' :index='index' :count='1'></menus-item>
    </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import router from "/@/router/index";
import store from "/@/store/index";

import { menusSettin } from '/@/config/assets-data';

// 组件
import menusLogo from './menus-logo.vue';
import menusItem from './menus-item.vue';


export default {
  name: "menus",
  components:{
    menusLogo,
    menusItem
  },
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

    function select(e){
      console.log(e);
    }

    let menus = store.state.user.menus;
    console.log(menus);

    return {
      navTo,
      outlogin,
      select,

      menus,
      menusSettin
    };
  },
};
</script>

<style lang='scss'>

@import '../../../style/menus.scss';

.element::-webkit-scrollbar { width: 0 !important }
.menus{
  min-width: 65px;
  overflow: hidden;
  min-height: 100vh;
  /* background: #20335D; */
  position: fixed;
  left: 0;
  top: 0;
  transition: width .3s;
}
.clear{
  min-width: 65px;
  height: 100vh;
}

.menus .viteIcon{
  font-size: 16px;
  /* border: 1px solid #fff; */
  color: #ccc;
  border-radius: 50%;
  padding: 5px;
}

.el-menu{
  border: none !important;
  box-sizing: border-box;
}
.el-menu > div{
  border: none !important;
}

.el-submenu .el-menu-item{
  border: none !important;
  box-sizing: border-box;
  background: $--menus-children-background !important;
  color: #ccc;
  overflow: hidden;
  /* background: v-bind(children); */
  /* padding-left: 40px !important; */
}
.el-menu-item{
  overflow: hidden;
}
.el-menu-item a{
  display: inline-block;
  width: 100%;
  color: #ccc;
  text-overflow: ellipsis;
  overflow-x: hidden;
  text-decoration: none;
}
.el-submenu .el-menu-item:hover{
  background: $--menus-children-hover-background !important;
}
.el-submenu__title{
  color: #ccc !important;
}

.el-submenu__title:hover .viteIcon,
.el-menu-item:hover .viteIcon,
// 不可以展开下级菜单悬浮时
.el-menu-item:hover a,
// 可以展开下级菜单悬浮时
.el-submenu__title:hover span{
  // background: $--menus-children-hover-background !important;
  color: $--menus-item-hover-color !important;
  transition: all .2s;
}
/* .el-submenu__title:hover,.el-menu-item:hover,.el-submenu__title:hover .viteIcon,.el-menu-item:hover .viteIcon{
  background: #182646 !important;
  color: #5874ae !important;
  transition: all .2s;
}
.el-menu-item:hover a{
  color: #5874ae !important;
}
.el-menu-item:hover{
  background: #101a33 !important;

}
.el-submenu__title:hover .viteIcon,.el-menu-item:hover .viteIcon{
  background: #202e50 !important;
} */
</style>
