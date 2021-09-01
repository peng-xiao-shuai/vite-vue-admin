<template>
  <div v-if="!item.hidden" :class="{ _submenu: collapse }">
    <el-submenu
      :index="item.name"
      v-if="item.children && item.children.length > 1"
    >
      <!-- 二级菜单有的情况下显示 -->
      <template #title>
        <div
          :style="{
            overflowX: collapse ? 'visible' : 'hidden',
            width: '100%',
            textOverflow: 'ellipsis',
          }"
        >
          <i :class="[item.meta.icon, defaultData.iconfont]"></i>
          <span class="metaTitle" v-show="!collapse || count !== 1">
            {{
              item.meta && item.meta.locale
                ? t(item.meta && item.meta.locale)
                : (item.meta && item.meta.title) || "null"
            }}
          </span>
        </div>
      </template>
      <menusItem
        :collapse="collapse"
        v-for="each in item.children"
        :key="each.name"
        :item="each"
        :count="count + 1"
      ></menusItem>
    </el-submenu>

    <!-- 二级菜单下有菜单的情况下显示 -->
    <el-menu-item
      :data-count="count"
      :index="(item.children && item.children[0].name) || item.name"
      :style="!collapse ? { paddingLeft: count * 20 + 'px' } : {}"
      v-else
    >
      <!-- 最后一级菜单没有子菜单情况下显示 -->

      <!-- 外链 -->
      <a
        :href="
          (item.children && item.children[0].meta.url) ||
          (item.meta && item.meta.url)
        "
        target="_black"
        v-if="
          (item.children && item.children[0].meta.url) ||
          (item.meta && item.meta.url)
        "
      >
        <i
          :class="[
            (item.children && item.children[0].meta.icon) ||
              (item.meta && item.meta.icon) ||
              '',
            defaultData.iconfont,
          ]"
        ></i>

        <span class="metaTitle">
          {{ text(item) }}
        </span>
      </a>

      <!-- 内联 -->
      <router-link
        v-else
        :to="{ name: (item.children && item.children[0].name) || item.name }"
        :style="{ overflowX: collapse ? 'visible' : 'hidden' }"
      >
        <i
          :class="[
            (item.children && item.children[0].meta.icon) ||
              (item.meta && item.meta.icon) ||
              '',
            defaultData.iconfont,
          ]"
        ></i>
        <span class="metaTitle" v-show="!collapse || count !== 1">
          {{ text(item) }}
        </span>
      </router-link>
    </el-menu-item>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'menusItem',
  props: {
    item: {
      type: Object,
      default: () => { },
    },
    index: {
      type: [Number, String],
      default: 0
    },
    // 组件层次
    count: {
      type: Number,
      default: 1
    },
    collapse: {
      type: Boolean,
      default: true
    },
  },
  setup (props, context) {
    const { t } = useI18n()

    const text = (e) => {
      // 判断有没有locale
      if ((e.children && e.children[0].meta.locale) || e.meta.locale) {
        return t((e.children && e.children[0].meta.locale) || e.meta.locale)
        // 没有就使用title
      } else if ((e.children && e.children[0].meta.title) || e.meta.title) {
        return (e.children && e.children[0].meta.title) || e.meta.title
      } else {
        return 'null'
      }
    }

    return {
      text
      //   parentIdx,
      //   getIndex
    }
  }
});
</script>

<style scoped>
._submenu > li :deep() .el-submenu__icon-arrow {
  display: none;
}

.metaTitle {
  margin-left: 6px;
}
</style>