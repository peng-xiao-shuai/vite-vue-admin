<template>
  <div class="menus" :style="{width:!collapse ? '65px' : '200px'}">

    <menus-logo :collapse='collapse'></menus-logo>

    <el-scrollbar style="height:calc(100vh - 50px)">
      <el-menu
        :collapse='!collapse'
        mode='vertical'
        class="el-menu-vertical-demo"
      >
        <!-- :default-active='' -->
        <menus-item :parentIndex='index +1' v-model:activeIndex='activeIndex' :index='index +1' :collapse='!collapse' v-for="(item,index) in menus" :key="item.name" :item='item' :count='1'></menus-item>
    </el-menu>
    </el-scrollbar>
  </div>

</template>

<script>
import router from "/@/router/index";
import store from "/@/store/index";

// 组件
import menusLogo from './menus-logo.vue';
import menusItem from './menus-item.vue';
import { ref } from 'vue';


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

    let parentIndex = ref('')

    let activeIndex = ref(-2)

    function navTo(e) {
      router.push({
        name: e
      });
    }

    function outlogin() {
      store.dispatch("outLoing");
    }

    function open(e){
      parentIndex.value = e
    }

    let menus = store.state.user.menus;
    console.log(menus);

    return {
      navTo,
      outlogin,
      open,
      parentIndex,
      activeIndex,

      menus,
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
  position: fixed;
  left: 0;
  top: 0;
  transition: width .3s;
}

.menus-logo{
  color: $--menus-logo-color;
  background: $--menus-logo-background;
}

.clear{
  min-width: 65px;
  height: 100vh;
}

.menus .viteIcon{
  font-size: 16px;
  /* border: 1px solid #fff; */
  color: $--menus-submenu-title-color;
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
// 菜单背景色
.el-menu-item,.el-submenu__title,.menus{
  overflow: hidden;
  background: $--menus-background !important;
}

.el-menu-item a{
  display: inline-block;
  width: 100%;
  color: $--menus-submenu-title-color;
  text-overflow: ellipsis;
  overflow-x: hidden;
  text-decoration: none;
}

.el-submenu .el-menu-item:hover{
  background: $--menus-children-hover-background !important;
}
.el-submenu__title{
  color: $--menus-submenu-title-color !important;
}

// 菜单元素点击时
._submenu .is-active a,.is-active[data-count="1"] a{
  color: $--menus-item-hover-color !important;
}
// 菜单展开时
.active .el-submenu__title > i,.active .el-submenu__title > span{
  color: $--menus-item-open-color !important;
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

// 一级菜单悬浮
.el-menu-item[data-count="1"]:hover,.el-submenu__title:hover{
    background: $--menus-item-hover-background !important;
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
