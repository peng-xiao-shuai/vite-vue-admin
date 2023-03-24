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
            :key="index"
            :class="['tag', { active: currentName == item.name }]"
          >
            <div @click="navTo(item)">
              {{ item?.meta?.locale ? t(item.meta.locale) : item?.meta?.title }}
            </div>
            <i
              v-if="!item.remove"
              class="el-icon el-icon-close"
              @click.stop="remove(index)"
              ><Close
            /></i>
          </div>
        </transition-group>
      </div>

      <!-- 右侧操作 -->
      <div>
        <el-icon class="tag" @click="dropdownChange('refresh')"
          ><refresh-right
        /></el-icon>
        <i
          :class="['tag el-icon vitequanping', defaultData.iconfont]"
          @click="handleFull"
        ></i>
        <el-dropdown trigger="click">
          <el-icon class="tag"><arrow-down /></el-icon>
          <template #dropdown>
            <el-dropdown-item
              v-for="item in dropdownList"
              :key="item.key"
              :divided="item.divided"
              :disabled="dropdownDisabled(item.key)"
              @click="dropdownChange(item.key)"
            >
              <span>
                <i :class="[item.icon]" :style="item.style"></i>
                {{ item.locale ? t(item.locale) : item.title }}
              </span>
            </el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter, RouteLocationNormalizedLoaded } from 'vue-router'
import { Tags, useUserStore } from '@/stores'
import type { Routers } from '@/router'
import screenFull from 'screenfull'
import { ElMessage } from 'element-plus'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    type DropdownList = {
      title: string
      locale: string
      icon: string
      key: string
      style?: {}
      divided?: boolean
    }
    const userStore = useUserStore()
    const route = useRoute()
    const router = useRouter()

    // 静态数据
    const dropdownList: DropdownList[] = [
      {
        title: '重新加载',
        locale: 'reloading',
        icon: 'el-icon-refresh-right',
        key: 'refresh',
      },
      {
        title: '关闭当前页',
        locale: 'close.current.tag.page',
        icon: 'el-icon-close',
        divided: true,
        key: 'closeCurrent',
      },
      {
        title: '关闭左侧标签页',
        locale: 'close.left.tag.page',
        icon: 'el-icon-download',
        style: {
          transform: 'rotate(90deg)',
        },
        key: 'closeLeft',
      },
      {
        title: '关闭右侧标签页',
        locale: 'close.right.tag.page',
        icon: 'el-icon-download',
        style: {
          transform: 'rotate(-90deg)',
        },
        key: 'closeRight',
      },
      {
        title: '关闭其他标签页',
        locale: 'close.other.tag.page',
        icon: 'el-icon-c-scale-to-original',
        key: 'closeOther',
      },
      {
        title: '关闭全部标签页',
        locale: 'close.all.tag.page',
        key: 'closeAll',
        icon: 'el-icon-minus',
      },
    ]
    const tags = computed<Tags[]>(() => userStore.tags)
    // 当前路由name
    const currentName = computed(() => {
      let isExist =
        tags.value.filter((item) => item.name == route.name).length > 0
          ? true
          : false
      addTag(route, isExist)
      return route.name
    })

    const addTag = (val: RouteLocationNormalizedLoaded, isExist: boolean) => {
      let matched = val.matched[val.matched.length - 1]
      let to: Tags = {
        path: matched.path,
        name: matched.name,
        meta: matched.meta as Routers['meta'],
        query: val.query,
        params: val.params,
      }

      if (!isExist && val.name !== 'redirect' && val.name !== '404') {
        // console.log(to)
        userStore.tagsOperate({ to })
      }
    }

    const remove = (i: number) => {
      if (tags.value[i].name === currentName.value) {
        router.push({
          name: tags.value[i - 1].name!,
          params: tags.value[i - 1].params,
          query: tags.value[i - 1].query,
        })
        setTimeout(() => {
          // i 为开始删除的下标，1 为删除的个数
          userStore.tagsOperate({ removeIndex: [i, 1] })
        }, 100)
      } else {
        userStore.tagsOperate({ removeIndex: [i, 1] })
      }
    }

    const navTo = (item: Tags) => {
      if (item.name === currentName.value) {
        // 手动重定向页面到 '/redirect' 页面
        router.replace({
          name: 'redirect',
          params: {
            params: JSON.stringify(item.params),
            __name: item.name as string,
          },
          query: item.query,
        })

        return
      } else {
        router.push({
          name: item.name!,
          params: {
            ...item.params,
          },
          query: item.query,
        })
      }
    }

    // 下拉禁用事件
    const dropdownDisabled = (e: string) => {
      const currentIndex = tags.value
        .map((item) => item.name)
        .indexOf(currentName.value)
      let disabled = false
      switch (e) {
        case 'closeLeft':
          disabled = currentIndex == 1 || currentIndex == 0
          break
        case 'closeRight':
          disabled = currentIndex == tags.value.length - 1
          break
      }

      return disabled
    }
    // 下拉点击事件
    const dropdownChange = (e: string) => {
      const currentIndex = tags.value
        .map((item) => item.name)
        .indexOf(currentName.value)
      const { path, name, query, params } = route

      switch (e) {
        case 'refresh':
          navTo({ path, name: name, params, query })
          break
        case 'closeLeft':
          userStore.tagsOperate({ removeIndex: [1, currentIndex - 1] })
          break
        case 'closeRight':
          userStore.tagsOperate({
            removeIndex: [
              currentIndex + 1,
              tags.value.length - currentIndex - 1,
            ],
          })
          break
        case 'closeAll':
          router.push({
            path: '/home',
          })
          setTimeout(() => {
            // i 为开始删除的下标，1 为删除的个数
            userStore.tagsOperate({
              removeIndex: [1, tags.value.length - 1],
            })
          }, 50)
          break
        case 'closeOther':
          userStore.tagsOperate({
            name: currentName.value as string | undefined,
          })
          break
      }
    }

    const handleFull = () => {
      if (!screenFull.isEnabled) {
        ElMessage({
          message: '您的浏览器不支持！',
          type: 'warning',
        })
        return false
      }
      const element = document.getElementById('view') as HTMLElement
      screenFull.toggle(element)
    }

    return {
      tags,
      currentName,
      dropdownList,
      remove,
      navTo,
      dropdownChange,
      handleFull,
      dropdownDisabled,
    }
  },
})
</script>

<style lang="scss">
.tags {
  padding: 7px 15px;
  border-top: 1px solid var(--el-border-color);
  transition: var(--el-transition-duration);
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
    border-radius: 5px;
    border: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;
    font-size: 12px;
    position: relative;
    box-sizing: border-box;
    transition: all 0.3s;
    color: #999;
    margin-right: 5px;

    &.el-icon {
      width: 30px;
      padding: 0;
      font-size: 14px;
    }

    &:last-child {
      margin-right: 0;
    }

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

    .el-icon-close {
      color: #ccc;
      transition: all 0.3s;
      margin-left: 5px;
      padding: 1px;
      border-radius: 50%;
      font-size: 10px;
    }

    .el-icon-close:hover {
      background: var(--el-fill-color);
      color: var(--el-color-primary);
    }
  }

  .tag:hover {
    color: var(--el-color-primary);
    border-color: var(--el-color-primary);
  }

  .tag::after {
    content: '';
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
    background: var(--el-color-primary);

    i {
      color: #fff;
    }

    .el-icon-close:hover {
      background: #fff;
      color: var(--el-color-primary);
    }

    a {
      text-decoration: none;
      color: #fff;
    }
  }

  .tag:active .el-icon-refresh-right {
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
