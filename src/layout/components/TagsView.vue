<template>
  <div class="tags">
    <el-scrollbar
      :style="{
        width: collapse ? 'calc(100vw - 200px)' : 'calc(100vw - 65px)',
      }"
    >
      <transition-group name="tags">
        <div
          v-for="(item, index) in tags"
          :key="index"
          :class="['tag', { active: currentName == item.name }]"
          :style="currentName == item.name ? { background: themeColor } : {}"
        >
          <div @click="navTo(item)">
            {{ item.meta.locale ? t(item.meta.locale) : item.meta.title }}
          </div>
          <i
            v-if="!item.remove"
            class="el-icon-close"
            @click.stop="remove(index)"
          ></i>
        </div>
      </transition-group>
    </el-scrollbar>
  </div>
</template>

<script>
import { useStore } from "vuex"
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    let store = useStore()
    let route = useRoute()
    let router = useRouter()
    let tags = store.state.user.tags
    // 当前路由name
    let currentName = computed(() => {
      let isExist = tags.filter(item => item.name == route.name).length > 0 ? true : false
      addTag(route, isExist)
      return route.name
    })

    function addTag (val, isExist) {
      let matched = val.matched[val.matched.length - 1]
      let to = {
        path: matched.path,
        name: matched.name,
        meta: matched.meta,
        query: val.query,
        params: val.params
      }

      if (!isExist && val.name !== "redirect" && val.name !== "404") {
        console.log(to)
        store.commit('tagsCommit', { to })
      }
    }

    function remove (i) {
      if (tags[i].name === currentName.value) {
        router.push({
          name: tags[i - 1].name,
          params: tags[i - 1].params,
          query: tags[i - 1].query
        })
        setTimeout(() => {
          store.dispatch('tagsActions', { removeIndex: i })
        }, 50)
      } else {
        store.dispatch('tagsActions', { removeIndex: i })
      }
    }

    function navTo (item) {
      if (item.name === currentName.value) {
        // 手动重定向页面到 '/redirect' 页面
        console.log(route)
        router.replace({
          name: 'redirect',
          params: {
            ...item.params,
            __name: item.name
          },
          query: item.query
        })

        return
      } else {
        router.push({
          name: item.name,
          params: {
            ...item.params,
          },
          query: item.query
        })
      }
    }

    return {
      tags,
      remove,
      currentName,
      navTo
    }
  }
})
</script>

<style lang='scss'>
.tags {
  padding: 7px 10px;
  border-top: 2px solid #f7f8f8;
  .el-scrollbar__view {
    display: flex;
  }

  // .animation{
  display: flex;

  .tag {
    cursor: pointer;
    transition: all 0.3s;
    padding: 4px 8px;
    height: 25px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-right: 5px;
    display: flex;
    align-items: center;
    font-size: 12px;
    position: relative;
    box-sizing: border-box;

    div {
      line-height: 25px;
      height: 25px;
      // min-width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      text-decoration: none;
      color: #333;
    }
    i {
      color: #ccc;
      transition: all 0.3s;
      margin-left: 5px;
      padding: 1px;
      border-radius: 50%;
      transform: scale(0.7);
      *font-size: 10px;
    }
    .el-icon-close:hover {
      background: #acacac;
      color: #fff;
    }
  }

  .tag::after {
    content: "";
    display: block;
    height: 50%;
    // border-right: 1px solid #ccc;
    position: absolute;
    right: 0;
  }

  .active {
    color: #fff;
    position: relative;
    transition: all 0.2s;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0);

    i {
      color: #fff;
    }

    .el-icon-close:hover {
      background: #fff;
    }

    a {
      text-decoration: none;
      color: #fff;
    }
  }
}
</style>