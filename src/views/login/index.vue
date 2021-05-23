<template>
  <div>
    <div class="login-form-layout">
      <span class="login-title color-main">{{ defalutData.name }}</span>
      <!-- :rules="loginRules" -->
      <el-form
        autoComplete="on"
        :model="loginForm"
        ref="login_form"
        label-position="left"
      >
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autoComplete="on"
            class="login-input borderBottom"
            :placeholder="t('please.enter.a.account.number')"
          >
            <template #prefix>
              <i class="el-icon-user icon" @click="handleIconClick"> </i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            class="login-input"
            @keyup.enter="handleLogin"
            v-model="loginForm.password"
            autoComplete="on"
            :placeholder="t('please.enter.a.PIN')"
          >
            <template #prefix>
              <i class="el-icon-lock icon" @click="handleIconClick"> </i>
            </template>
            <template #suffix>
              <i
                :class="[
                  pwdType == 'password' ? 'vitebiyan' : 'viteyanjing',
                  'viteIcon',
                ]"
                @click="pwdType = pwdType == 'password' ? 'text' : 'password'"
              >
              </i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="btn">
        <el-button
          :style="{ width: '100%', backgroundColor: themeColor }"
          :loading="loading"
          @click.prevent="handleLogin('login_form')"
        >
          {{ t("login") }}
        </el-button>
      </div>

      <div style="color: #ccc">账号：admin 密码：123456</div>
      <div style="color: #ccc">账号：ordinary 密码：123456</div>
    </div>
    <el-image
      :src="bgImage"
      fit="cover"
      class="bgImage"
      :style="{ background: '#fff' }"
    ></el-image>
  </div>
</template>

<script>
//   import {isvalidUsername} from '@/utils/validate';
//   import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
import bgImage from '@/assets/bgImg.png'
import { ref, reactive, onMounted, defineComponent } from "vue"
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'


export default defineComponent({
  setup () {
    let store = useStore()

    let loginForm = reactive({
      username: 'admin',
      password: 123456
    })

    let loginRules = {
      username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
    }
    let pwdType = ref('password')
    let loading = ref(false)
    // $ref
    let login_form = ref(null)

    onMounted(() => {
      // 登录页清楚token
      store.dispatch('outLoing')
    })

    // console.log(getCurrentInstance().appContext.config.globalProperties.defalutData);

    function handleLogin () {
      login_form.value.validate((valid) => {
        if (valid) {
          // alert('submit!');

          if (loginForm.username == '') {
            ElMessage.warning('请输入用户名')
            return false
          } else if (loginForm.password == '') {
            ElMessage.warning('请输入密码')
            return false
          }

          loading.value = true
          store.dispatch('loginAction', loginForm).then(res => { if (!res) { loading.value = false } })

        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

    return {
      bgImage,
      // 2.0 ref
      login_form,
      // 表单数据
      loginForm,
      // 提交事件
      handleLogin,
      // 规则效验
      loginRules,
      pwdType,
      loading,
    }
  }
});
</script>

<style scoped>
.login-title {
  text-align: left;
  color: #333;
  display: block;
  font-weight: bold;
  font-size: 22px;
  width: 100%;
  margin-bottom: 40px;
  /* position: sticky; */
  /* z-index: 666; */
}

.el-form {
  /* background: rgba(255, 255, 255, 0.2); */
  border-radius: 10px;
}
.el-form-item {
  margin: 10px 0;
}
.el-form :deep() .el-form-item__label {
  font-weight: bold;
}
.el-form :deep() i {
  font-weight: bold;
  color: #606266;
}
.login-input ::v-deep() input {
  background: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 0;
  line-height: 50px;
  /* height: 50px; */
}
.borderBottom {
  padding-bottom: 10px;

  border-bottom: 1px solid #eee !important;
}

.bgImage {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.login-form-layout {
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%) scale(1.25);
  width: 320px;
  margin: 0 auto;
  border-radius: 5px;
}

.btn {
  width: 60%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.btn ::v-deep() .el-button {
  height: 35px;
  border-radius: 17.5px;
  background: #409eff;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: bold;
}

button:focus {
  outline: none;
}
</style>
