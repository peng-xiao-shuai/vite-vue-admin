<template>
  <div>
    <div class="login-form-layout">
      <form>
        <div style="text-align: center">
          <!-- <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon> -->
        </div>
        <h2 class="login-title color-main">商城管理系统</h2>
        <div class="inpBox">
          <input
            name="username"
            v-model="user.username"
            autoComplete="on"
            placeholder="请输入用户名"
          />
        </div>
        <div class="inpBox">
          <!-- :type="pwdType" -->
          <input
            name="password"
            @keyup.enter="handleLogin"
            v-model="user.password"
            placeholder="请输入密码"
          />
          <span>
            <!-- <svg-icon icon-class="password" class="color-main"></svg-icon> -->
          </span>
          <span @click="showPwd">
            <!-- <svg-icon icon-class="eye" class="color-main"></svg-icon> -->
          </span>
        </div>
        <div style="margin-bottom: 100px; text-align: center">
          <button style="width: 45%" @click.prevent="handleLogin">
            登录
          </button>
        </div>
      </form>
    </div>
    <img src="/@/assets/login_center_bg.png" class="login-center-layout" />
  </div>
</template>

<script>
//   import {isvalidUsername} from '@/utils/validate';
//   import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
import { ref, reactive, onMounted } from "vue";
import router  from '/@/router/index';
import { login } from "/@/api/logins";
import store from '../../store';

export default {
  setup() {

    let user = reactive({
      username: "",
      password: "",
    });

    onMounted(()=>{
      // 登录页清楚token
      store.dispatch('outLoing')
    })

    function handleLogin() {
      store.dispatch('loginAction',user)
    }

    return {
      user,
      handleLogin,
    };
  },
  methods: {},
};
</script>

<style scoped lang='scss'>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  background: #fff;
  border-radius: 5px;
  border-top: 10px solid #409eff;
  box-shadow: 2px 2px 15px rgba(0, 0, 0, 0.2);
}

.login-title {
  text-align: center;
}

.inpBox {
  display: flex;
  align-items: center;

  input {
    width: 80%;
    height: 25px;
    padding: 5px;
    margin: 0 auto;
    border-radius: 3px;
    border: 1px solid #ccc;
    outline-color: #409eff;
    margin-bottom: 20px;
  }
}

button {
  height: 35px;
  border-radius: 3px;
  background: #409eff;
  color: #fff;
  border: none;
}

button:focus {
  outline: none;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
