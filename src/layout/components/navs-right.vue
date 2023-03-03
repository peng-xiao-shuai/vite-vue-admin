<template>
  <div class="nav-right">
    <!-- 搜索 -->
    <search />

    <!-- 语言 -->
    <language />

    <!-- bug -->
    <bug />

    <!-- 组件大小 -->
    <size />
    <!-- 全屏 -->
    <full-screen />

    <dark />

    <!-- 用户 -->
    <div class="item">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="header-icon">
          <img
            :src="icon"
            alt=""
            style="width: 100%; height: 100%; border-radius: 5px"
          />
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item class="_flex-center">
                {{ t('home') }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item class="_flex-center" divided>
              <div class="_flex _flex-center" @click="logout">
                {{ t('exit') }}
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a
                href="https://github.com/Peng-Xiao-Shuai-0902/vite-vue-admin"
                style="
                  display: block;
                  text-decoration: none;
                  text-align: center;
                  color: var(--el-color-primary);
                "
                >{{ 'GitHub' }}</a
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { useStore } from 'vuex'
// import { updatePassword } from "@/api/logins";

import search from './nav-right/seacrh'
import language from './nav-right/language.vue'
import bug from './nav-right/bug'
import fullScreen from './nav-right/full-screen'
import dark from './nav-right/dark.vue'
import size from './nav-right/size'

export default defineComponent({
  components: {
    search,
    language,
    bug,
    fullScreen,
    size,
    dark,
  },
  setup() {
    let Store = useStore()

    // 账号头像
    let icon = computed(() => Store.state.user.userInfo.icon)

    let dialogVisible = ref(false)
    let pwdType = ref('password')
    let adminForm = ref<any | null>(null)

    let loginRules = ref({
      username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      oldPassword: [
        { required: true, trigger: 'blur', message: '请输入旧密码' },
      ],
      newPassword: [
        { required: true, trigger: 'blur', message: '请输入新密码' },
      ],
    })
    let admin = reactive({
      username: '',
      oldPassword: '',
      newPassword: '',
    })

    function logout() {
      Store.dispatch('outLogin')
    }

    function close() {
      dialogVisible.value = false
    }

    return {
      icon,
      dialogVisible,
      admin,
      pwdType,
      loginRules,
      adminForm,

      close,
      logout,
    }
  },
})
</script>

<style lang="scss">
.nav-right {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    margin-right: 5px;
    cursor: pointer;
    &:last-of-type {
      margin-right: 0;
    }
    &:deep(.el-input__inner) {
      border: none !important;
      padding-left: 0 !important;
    }
    &:deep(.el-select) {
      border-bottom: 1px solid #ccc !important;
    }
    .header-icon {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: flex-end;
    }

    .viteIcon:focus,
    .header-icon:focus,
    &:focus {
      outline: 0;
    }

    i,
    .viteIcon {
      color: var(--el-text-color-regular);
    }

    .viteIcon {
      font-size: 26px;
      padding: 5px;
      border: 1px solid rgba(0, 0, 0, 0);
      position: sticky;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: 18px;
      transition: var(--el-transition-duration);
    }

    .viteIcon:hover {
      border-radius: 5px;
      // background: var(--el-fill-color-dark);
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }

    .searchSelect {
      border: none;
    }
  }
  .isBug {
    position: relative;

    .viteIcon {
      transition: var(--el-transition-duration);
      color: #fff;
      background: var(--el-color-danger);
      font-weight: bold;
      overflow: hidden;
      font-size: 20px;
      border-radius: 5px;
    }
    &:hover {
      .viteIcon {
        color: #fff;
        border-color: transparent;
        background: var(--el-color-danger-light-3);
      }
      .bugNum {
        background: var(--el-color-danger-light-3);
      }
    }

    .bugNum {
      transition: var(--el-transition-duration);
      position: absolute;
      top: -2px;
      right: -4px;
      width: 7px;
      height: 7px;
      text-align: center;
      line-height: 10px;
      display: inline-block;
      background: var(--el-color-danger);
      border-radius: 50%;
      border: 1.5px solid #fafafa;
    }
  }
}

.inlineBlock {
  text-decoration: none;
  color: #000;
}
</style>
