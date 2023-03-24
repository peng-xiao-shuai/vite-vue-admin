<template>
  <div class="login-form">
    <slot name="header"></slot>
    <el-form :model="loginForm" ref="login_form" size="large">
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          auto-complete="on"
          class="login-input border-bottom"
          :placeholder="t('please.enter.a.account.number')"
        >
          <template #prefix>
            <el-icon class="icon"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="pwdType"
          @keyup.enter="handleLogin"
          v-model="loginForm.password"
          auto-complete="on"
          class="login-input border-bottom"
          :placeholder="t('please.enter.a.PIN')"
        >
          <template #prefix>
            <el-icon class="icon"><Lock /></el-icon>
          </template>
          <template #suffix>
            <i
              :class="[pwdType == 'password' ? 'vitebiyan' : 'viteyanjing']"
              @click="pwdType = pwdType == 'password' ? 'text' : 'password'"
            >
            </i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="btn">
      <el-button
        :disabled="loading"
        :loading="loading"
        @click.prevent="handleLogin()"
      >
        {{ t('login') }}
      </el-button>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElForm, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
defineProps<{
  loading: boolean
}>()
const emit = defineEmits<{
  (e: 'success', formData: FormData): void
}>()
const loginForm: FormData = reactive({
  username: 'admin',
  password: '123456',
})
// const loginRules = {
//   username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
//   password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
// }
const pwdType = ref('password')
const login_form = ref<InstanceType<typeof ElForm> | null>(null)

const handleLogin = () => {
  login_form.value?.validate((valid) => {
    if (valid) {
      if (loginForm.username == '') {
        ElMessage.warning('请输入用户名')
        return false
      } else if (loginForm.password == '') {
        ElMessage.warning('请输入密码')
        return false
      }
      emit('success', loginForm)
    } else {
      return false
    }
  })
}
</script>

<script lang="ts">
export interface FormData {
  username: string
  password: string
}
</script>

<style scoped lang="scss">
.login-form {
  & :deep(.el-form) {
    width: 100%;
    /* background: rgba(255, 255, 255, 0.2); */
    border-radius: 10px;
    .el-form-item {
      margin: 15px 0;
      &__content {
        .el-input__wrapper {
          background: transparent;
          box-shadow: none;
          border-radius: 0;
          transition: var(--el-transition-duration);

          &.is-focus {
            box-shadow: none;
          }
          &:hover {
            box-shadow: none;
          }

          .el-input__inner {
            color: var(--el-color-primary-light-8);
          }
        }
        .border-bottom .el-input__wrapper {
          border-bottom: 2px solid var(--el-color-primary-light-3);
          background: var(--el-color-primary-dark-2);
          border-radius: 6px;
          &.is-focus {
            border-color: var(--el-color-primary-light-8);
          }
        }
      }
    }
    i {
      font-size: var(--el-font-size-extra-large);
      color: var(--el-color-primary-light-8);
    }
  }
  .btn {
    width: 100%;
    padding: 20px 10px;
    & :deep(.el-button) {
      width: 100%;
      height: 35px;
      border-radius: 50px;
      color: var(--el-color-primary);
      border: none;
      letter-spacing: 10px;
      font-size: var(--el-font-size-large);
      background: var(--el-color-primary-light-7);
    }
  }
}
</style>
