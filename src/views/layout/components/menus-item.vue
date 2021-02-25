<template>
  <div v-if="!item.hidden" :class="{_submenu: collapse}">
    <el-submenu :index="String(index)" v-if="item.children && item.children.length > 1">
      <template #title>
        <i :class="[item.meta.icon, 'viteIcon']"></i>
        <span class="metaTitle" v-show="!collapse">
          {{ (item.meta && item.meta.title) || "" }}
        </span>
      </template>
      <!-- <template v-for="(each) in item.children" :key="each.name"> -->
        <!-- <el-menu-item-group
          v-if="!each.hidden"
          class="children"
        > -->
            <menusItem  v-for="(each,idx) in item.children" :key="each.name" :item='each' :index='String(index + idx)' :count='count + 1'></menusItem>
          <!-- <el-menu-item :index="_index + '-' + idx">
            <i :class="[each.meta.icon, 'viteIcon']"></i>
            {{ each.meta && each.meta.title }}</el-menu-item
          > -->
        <!-- </el-menu-item-group> -->
      <!-- </template> -->
    </el-submenu>

    <el-menu-item :index="String(index)" :style="{paddingLeft: count * 20 + 'px'}" v-else>
      <router-link :to="{ name: item.children && item.children[0].name || item.name }" :style="{overflowX: !collapse && count == 1 ? 'hidden' : 'visible'}">
        <i :class="[item.children && item.children[0].meta.icon || (item.meta && item.meta.icon || ''), 'viteIcon']"></i>
        <span class="metaTitle" v-show="!collapse || count > 1">{{ item.children && item.children[0].meta.title || item.meta.title }}</span>
      </router-link>
    </el-menu-item>
  </div>
</template>

<script>
export default {
    name:'menusItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    index:{
        type: [Number,String],
        default: 0
    },
    // 组件层次
    count:{
        type: Number,
        default: 1
    },
    collapse:{
      type:Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
._submenu /deep/ .el-submenu__icon-arrow{
  display: none;
}

.metaTitle{
  margin-left: 6px;
}
</style>