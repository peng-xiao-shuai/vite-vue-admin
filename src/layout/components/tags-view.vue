<template>
  <div class="tags">
    <el-scrollbar
      :style="{
        width: collapse ? 'calc(100vw - 200px)' : 'calc(100vw - 65px)',
      }"
    >
      <!-- 左侧标签 -->
      <div>
        <transition-group name="tags">
          <div
            v-for="(item, index) in tags"
            :key="item.name"
            :class="['tag', { active: currentName == item.name }]"
            :style="currentName == item.name ? { background: themeColor } : {}"
          >
            <div @click="navTo(item)">
              {{ item?.meta?.locale ? t(item.meta.locale) : item?.meta?.title }}
            </div>
            <i
              v-if="!item.remove"
              class="el-icon-close"
              @click.stop="remove(index)"
            ></i>
          </div>
        </transition-group>
      </div>
      
      <!-- 右侧操作 -->
      <div>
        <span class="tag" @click="dropdownChange('refresh')">
          <span class="el-icon-refresh-right"></span>
        </span>
        <el-dropdown trigger='click'>
          <span class="tag">
            <span class="el-icon-arrow-down"></span>
          </span>
          <template #dropdown>
            <el-dropdown-item v-for="item in dropdownList" :key='item.key' :divided="item.divided" :disabled="dropdownDisabled(item.key)" @click='dropdownChange(item.key)'>
              <span>
                <i :class="[item.icon]" :style="item.style"></i>
                {{item.locale ? t(item.locale) : item.title}}
              </span>
            </el-dropdown-item>
          </template>
        </el-dropdown>
        <span :class="['tag', 'vitequanping', defaultData.iconfont]" @click="handleFull"></span>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { computed, defineComponent, toRaw } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import type { Tags } from '@/store/modules/user';
import screenFull from "screenfull";
import { ElMessage } from 'element-plus';

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

    type DropdownList = {
      title: string,
      locale: String,
      icon: string,
      key: string,
      style?: {},
      divided?: boolean
    }
    // 静态数据
    const dropdownList: DropdownList[] = [{
      title: '重新加载',
      locale: 'reloading',
      icon: 'el-icon-refresh-right',
      key: 'refresh',
    },{
      title: '关闭当前页',
      locale: 'close.current.tag.page',
      icon: 'el-icon-close',
      divided: true,
      key: 'closeCurrent',
    },{
      title: '关闭左侧标签页',
      locale: 'close.left.tag.page',
      icon: 'el-icon-download',
      style: {
        transform: 'rotate(90deg)'
      },
      key: 'closeLeft',
    },{
      title: '关闭右侧标签页',
      locale: 'close.right.tag.page',
      icon: 'el-icon-download',
      style: {
        transform: 'rotate(-90deg)'
      },
      key: 'closeRight',
    },{
      title: '关闭其他标签页',
      locale: 'close.other.tag.page',
      icon: 'el-icon-c-scale-to-original',
      key: 'closeOther',
    },{
      title: '关闭全部标签页',
      locale: 'close.all.tag.page',
      key: 'closeAll',
      icon: 'el-icon-minus',
    }]  
    let tags = computed<Tags[]>(() => store.state.user.tags)
    // 当前路由name
    let currentName = computed(() => {
      let isExist = tags.value.filter(item => item.name == route.name).length > 0 ? true : false
      addTag(route, isExist)
      return route.name
    })

    function addTag (val: RouteLocationNormalizedLoaded, isExist: boolean) {
      let matched = val.matched[val.matched.length - 1]
      let to = {
        path: matched.path,
        name: matched.name,
        meta: matched.meta,
        query: val.query,
        params: val.params
      }

      if (!isExist && val.name !== "redirect" && val.name !== "404") {
        // console.log(to)
        store.commit('tagsCommit', { to })
      }
    }

    function remove (i: number) {
      if (tags.value[i].name === currentName.value) {
        router.push({
          name: tags.value[i - 1].name,
          params: tags.value[i - 1].params,
          query: tags.value[i - 1].query
        })
        setTimeout(() => {
          // i 为开始删除的下标，1 为删除的个数
          store.dispatch('tagsActions', { removeIndex: [i, 1] })
        }, 50)
      } else {
        store.dispatch('tagsActions', { removeIndex: [i, 1] })
      }
    }

    function navTo (item: Tags) {
      if (item.name === currentName.value) {
        // 手动重定向页面到 '/redirect' 页面
        router.replace({
          name: 'redirect',
          params: {
            ...item.params,
            __name: item.name as string
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
    
    // 下拉禁用事件
    const dropdownDisabled = (e:string) => {
      const currentIndex = tags.value.map(item => item.name).indexOf(currentName.value as string)
      let disabled = false
      switch(e) {
        case 'closeLeft':
          disabled = currentIndex == 1 || currentIndex == 0
          break;
        case 'closeRight':
          disabled = currentIndex == tags.value.length -1
          break;
      }

      return disabled
    }
    // 下拉点击事件
    const dropdownChange = (e:string) => {
      const currentIndex = tags.value.map(item => item.name).indexOf(currentName.value as string)
      const { path, name, query, params } = route

      switch(e) {
        case 'refresh':
          navTo({path, name: name as string, params, query})
          break;
        case 'closeLeft':
          store.dispatch('tagsActions', { removeIndex: [1, currentIndex - 1] })
          break;
        case 'closeRight':
          store.dispatch('tagsActions', { removeIndex: [currentIndex + 1, tags.value.length - currentIndex - 1] })
          break;
        case 'closeAll':
          router.push({
            path: '/home'
          })
          setTimeout(() => {
            // i 为开始删除的下标，1 为删除的个数
            store.dispatch('tagsActions', { removeIndex: [1, tags.value.length - 1] })
          }, 50)
          break;
        case 'closeOther':
            store.dispatch('tagsActions', { name: currentName.value })
          break;
      }
    }

    const handleFull = () => {
      if (!screenFull.isEnabled) {
        ElMessage({
          message: "您的浏览器不支持！",
          type: "warning",
        });
        return false;
      }
      const element = document.getElementById('view') as HTMLElement
      screenFull.toggle(element);
    }

    return {
      tags,
      currentName,
      dropdownList,
      remove,
      navTo,
      dropdownChange,
      handleFull,
      dropdownDisabled
    }
  }
})
</script>

<style lang='scss'>
.tags {
  padding: 7px 10px;
  border-top: 2px solid #f7f8f8;
  display: flex;

  .el-scrollbar__view {
    display: flex;
    justify-content: space-between;

    > div {
      display: flex;
    }
  }

  .tag {
    cursor: pointer;
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
    transition: all 0.3s;

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
    span {
      transition: all 0.3s;
    }
    i {
      color: #ccc;
      transition: all 0.3s;
      margin-left: 5px;
      padding: 1px;
      border-radius: 50%;
      transform: scale(0.7);
      font-size: 10px;
    }
    .el-icon-close:hover {
      background: #acacac;
      color: #fff;
    }
  }

  .tag:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
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
    color: #fff !important;
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

  .tag:active .el-icon-refresh-right{
    animation: deg 0.4s;
  }

  @keyframes deg {
    to {
      transform: rotate(0deg);
    }
    from {
      transform: rotate(-360deg);
    }
  }
}
</style>