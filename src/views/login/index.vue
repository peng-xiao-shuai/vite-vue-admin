<template>
  <div class="login">
    <!-- 顶部工具 -->
    <div class="tools-box _flex _flex-align-center _flex-justify-between">
      <div class="logo _flex _flex-align-center">
        <img
          style="width: 35px; height: 35px; margin-right: 5px"
          src="@/assets/logo.svg"
        />
        <span class="logo-title">{{ defaultData.name }}</span>
      </div>
      <div class="_flex _flex-align-center tools">
        <Language />
        <ComponentSize />
        <Dark />
      </div>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      :width="radius * 2"
      :height="radius * 2"
    >
      <circle
        :cx="radius"
        :cy="radius"
        :r="radius"
        fill="var(--el-color-primary)"
      />
      <circle
        :cx="radius"
        :cy="radius"
        :r="radius - 5"
        fill="var(--el-color-primary)"
        stroke="var(--el-color-primary-light-8)"
        stroke-width="3"
      />
    </svg>

    <div class="login-form-box _flex">
      <div class="exhibition-img">
        <div class="bg-img"></div>
        <div class="window"></div>
      </div>
      <login-form
        :loading="loading"
        class="form-box _flex _flex-wrap"
        @success="passcallback"
      >
        <template #header>
          <div class="form-box-title">{{ t('login') }}</div>
        </template>
        <template #footer>
          <el-text tag="div">账号：admin 密码：123456</el-text>
          <el-text tag="div">账号：ordinary 密码：123456</el-text>
        </template>
      </login-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import dragVerifyImgChip from '@/components/drag-verify-img/index.vue'
// import t2 from '@/assets/t2.png'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Language from '@/layout/components/nav-right/language.vue'
import Dark from '@/layout/components/nav-right/dark.vue'
import ComponentSize from '@/layout/components/nav-right/size'
import LoginForm, { type FormData } from './components/login-form.vue'
import { useUserStore } from '@/stores'

let userStore = useUserStore()

const imgObj = reactive({
  isPassing: false,
  isDialog: false,
})

const radius = ref(window.innerWidth / 2)

let loading = ref(false)

onMounted(() => {
  // 登录页清楚token
  userStore.outLogin()
})

// 成功回调
const passcallback = (formData: FormData) => {
  loading.value = true
  userStore
    .loginRequest(formData)
    .then((res) => {
      if (res.code === 200) {
        loading.value = false
      }
    })
    .catch((_err) => {
      imgObj.isDialog = false
      loading.value = false
      imgObj.isPassing = false
    })
}

const listener = () => {
  radius.value = window.innerWidth / 2
}
window.addEventListener('resize', listener)
onUnmounted(() => {
  window.removeEventListener('resize', listener)
})
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: var(--el-color-primary-light-8);
  transition: var(--el-transition-duration);

  > svg {
    display: block;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  }

  &-form-box {
    transform: translateY(calc(50vh - 50%));
    width: 60vw;
    height: 500px;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: var(--el-box-shadow);
    .exhibition-img {
      width: 580px;
      min-width: 580px;
      position: relative;
      .bg-img {
        width: 100%;
        height: 100%;
        background: url('@/assets/login-exhibition.png') no-repeat center;
        background-size: 100%;
        opacity: 0.7;
      }

      .window {
        position: absolute;
        top: 72px;
        left: 91px;
        width: 68%;
        height: 260px;
        border-radius: 13px 13px 0 0;
        background-image: url('@/assets/window.png'),
          linear-gradient(
            45deg,
            var(--el-color-primary),
            var(--el-color-primary-light-8)
          );
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
      }
    }
    .form-box {
      width: 50%;
      padding: 0 50px;
      box-sizing: border-box;
      align-content: center;
      &-title {
        width: 100%;
        color: var(--el-color-primary-light-8);
        text-align: center;
        padding: 20px 0;
        font-size: calc(var(--el-font-size-large) + 10px);
      }
    }
    .el-text {
      text-align: center;
      color: var(--el-color-primary-light-8);
      width: 100%;
    }
  }

  .tools-box {
    position: absolute;
    width: 100vw;
    padding: 10px;
    box-sizing: border-box;
    z-index: 6;
    > div {
      flex: 1;
    }

    > .tools {
      justify-content: flex-end;
      & :deep(.item) {
        cursor: pointer;
        margin-right: 5px;
        &:last-of-type {
          margin-right: 0;
        }

        .viteIcon {
          border: 1px solid rgba(0, 0, 0, 0);
          color: var(--el-color-primary-light-8);
          width: 35px;
          height: 35px;
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          font-size: 18px;
          transition: border var(--el-transition-duration),
            border-radius var(--el-transition-duration);

          &:hover {
            border-color: var(--el-color-primary-light-8);
            border-radius: 5px;
          }
        }
        .switch {
          border-color: var(--el-color-primary-light-8);
          &:hover {
            border-color: var(--el-color-primary-light-8);
          }
        }
      }
    }

    .logo {
      &-title {
        margin: 0;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: bold;
        color: var(--el-color-primary);
      }
    }
  }
}

@media screen and (width <=1500px) {
  .login {
    &-form-box {
      width: 70vw;
    }
  }
}

@media screen and (width <=1300px) {
  .login {
    &-form-box {
      width: 80vw;
    }
  }
}

.dark .window {
  filter: brightness(0.8);
}
</style>
