<template>
  <div style="padding: 0 15px" class="navs">
    <div class="left">
      <i
        :class="[
          'vitecaidan',
          defaultData.iconfont,
          collapse ? 'collapse' : '',
        ]"
        :style="{ color: themeColor }"
        @click="handleCollapse"
      >
      </i>
      <el-breadcrumb separator="/" class="_flex _flex-align-center">
        <transition-group name="list">
          <el-breadcrumb-item
            :to="{ path: item.path }"
            v-for="(item, index) in matched"
            :key="index"
          >
            <el-dropdown v-if="item.children && item.children.length">
              <div class="dropdown-div _flex _flex-align-center">
                {{ item.meta.locale ? t(item.meta.locale) : item.meta.title }}
                <el-icon><el-icon-arrow-down /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="each in item.children"
                    :key="each.name"
                    :to="item.redirect || item.path"
                  >
                    <router-link
                      :to="each.redirect || each.path"
                      class="router-link"
                    >
                      {{
                        each.meta.locale ? t(each.meta.locale) : each.meta.title
                      }}
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <router-link v-else :to="item.redirect || item.path">{{
              item.meta.locale ? t(item.meta.locale) : item.meta.title
            }}</router-link>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>

    <navs-right />
  </div>
</template>

<script>
import { ArrowDown as ElIconArrowDown } from '@element-plus/icons'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import navsRight from './navs-right.vue'
import { useStore } from 'vuex'

export default {
  components: {
    navsRight,
    ElIconArrowDown,
  },
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const store = useStore()
    let route = useRoute()
    let matched = []
    matched = computed(() => {
      let arr = route.matched
      if (arr[0].path !== '/') {
        arr = route.matched
      }

      return arr.filter(
        (item) => item.meta && item.meta.title && !item.meta.breadcrumb
      )
    })

    const handleCollapse = () => {
      store.commit('setSetting', {
        val: props.collapse ? 0 : 1,
        key: 'defaultMenu',
      })
    }

    window.addEventListener('beforeunload', function () {
      // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
      // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
      window.localStorage.setItem('APP_LOCAL_CACHE_KEY', 121)
    })

    function storageChange(e) {
      const { key, newValue, oldValue } = e
      console.log(e)

      if (!!newValue && !!oldValue) {
        if ('APP_LOCAL_CACHE_KEY' === key) {
          console.log('newValue', newValue)
          // Persistent.clearLocal();
        }
      }
    }

    window.addEventListener('storage', storageChange)

    return {
      matched,
      handleCollapse,
    }
  },
}
</script>

<style lang="scss" scoped>
.navs {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .dropdown-div {
      transition: all 0.4s;
      outline: none;
      &:hover {
        color: var(--el-color-primary);
      }
    }
    > div {
      margin: 0 10px;
    }
    i {
      font-size: 18px;
      transition: all 0.4s;
    }
    i.el-icon-arrow-down {
      font-size: 12px;
      margin: 0;
    }
    .collapse {
      transform: rotate(-180deg);
    }
  }
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
