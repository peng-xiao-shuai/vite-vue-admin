<template>
  <div>
    <div class="login-form-layout">
      <span class="login-title color-main">商城管理系统</span>
      <!-- :rules="loginRules" -->
      <el-form autoComplete="on"
               :model="loginForm"
               ref="login_form"
               label-position="left">
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    class="login-input borderBottom"
                    placeholder="请输入用户名">
              <template #prefix>
                <i class="el-icon-user icon" @click="handleIconClick"> </i>
              </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    class="login-input"
                    @keyup.enter="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
              <template #prefix>
                <i class="el-icon-lock icon" @click="handleIconClick"> </i>
              </template>
              <template #suffix>
                <i :class="[pwdType == 'password' ? 'vitebiyan' : 'viteyanjing','viteIcon']" @click="pwdType = pwdType == 'password' ? 'text' : 'password'"> </i>
              </template>
          </el-input>
        </el-form-item>
      </el-form>

      <div class="btn">
        <el-button :style="{width: '100%',backgroundColor: themeColor.background}" :loading="loading" @click.native.prevent="handleLogin('login_form')">
            登录
        </el-button>      
      </div>

      <div style="color:#ccc">账号：admin 密码：123456</div>
      <div style="color:#ccc">账号：ordinary 密码：123456</div>
    </div>
    <el-image :src="bgImage" fit="cover" class='bgImage'></el-image>
  </div>
</template>

<script>
//   import {isvalidUsername} from '@/utils/validate';
//   import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support';
import bgImage from '/@/assets/bgImg.png';
import { ref, reactive, onMounted, defineComponent, getCurrentInstance } from "vue";
import store from '../../store';
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {

    let loginForm = reactive({
      username: 'admin',
      password: 123456
    });

    let loginRules = {
        username: [{required: true, trigger: 'blur', message: '请输入用户名'}],
        password: [{required: true, trigger: 'blur', message: '请输入密码'}]
    }
    let pwdType = ref('password')
    let loading = ref(false)
    // $ref
    let login_form = ref(null);

    onMounted(()=>{
      // 登录页清楚token
      store.dispatch('outLoing')
    })
    
    // console.log(getCurrentInstance().appContext.config.globalProperties.defalutData);

    function handleLogin() {
      login_form.value.validate((valid) => {
          if (valid) {
            // alert('submit!');

            if(loginForm.username == ''){
              ElMessage.warning('请输入用户名')
              return false
            }else if(loginForm.password == ''){
              ElMessage.warning('请输入密码')
              return false
            }

            loading.value = true
            store.dispatch('loginAction',loginForm).then(res =>{if(!res){loading.value = false}})

          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
    };
  }
});
</script>

<style scoped>
.login-title{
  text-align: center;
  color: #fff;
  display: block;
  font-size: 28px;
  width: 100%;
  margin-bottom: 20px;
}

.el-form{
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px 20px;
}
.el-form-item{
  margin: 10px 0;
}

.login-input{
}
.login-input /deep/ .el-input__prefix{
  /* display: flex; */
  /* align-items: center; */
}
.login-input /deep/ input{
  background: rgba(0, 0, 0, 0);
  border:none;
  border-radius: 0;
  color: #fff;
  line-height: 50px;
  /* height: 50px; */
}
.borderBottom{
  padding-bottom: 10px;

  border-bottom: 1px solid #fff !important;
} 

.bgImage{
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -2;
}

.login-form-layout {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 360px;
  margin: 0 auto;
  border-radius: 5px;
}

.btn{
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.btn /deep/ .el-button{
  height: 35px;
  border-radius: 3px;
  background: #409eff;
  color: #fff;
  border: none;
}

button:focus {
  outline: none;
}

</style>
