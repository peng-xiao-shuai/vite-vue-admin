<template>
  <div class="nav-right">
    <!-- 搜索 -->
    <search></search>

    <!-- 语言 -->
    <language></language>

    <!-- bug -->
    <bug></bug>

    <!-- 组件大小 -->
    <size></size>
    <!-- 全屏 -->
    <full-screen></full-screen>
    <!-- 用户 -->
    <div class="item">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="icon">
          <img
            :src="icon"
            alt=""
            style="width: 100%; height: 100%; border-radius: 5px"
          />
          <!-- <i class="el-icon-caret-bottom"></i> -->
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <!-- <el-dropdown-item>
              <span
                span
                @click="dialogVisible = !dialogVisible"
                style="display: block"
                >{{ t("update") }} {{ t("password") }}</span
              >
            </el-dropdown-item> -->
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item style="text-align: center">
                {{ t("home") }}
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span
                @click="logout"
                style="display: block; text-align: center"
                >{{ t("exit") }}</span
              >
            </el-dropdown-item>
            <el-dropdown-item divided>
              <a
                href="https://github.com/Peng-Xiao-Shuai-0902/vite-vue-admin"
                style="
                  display: block;
                  text-decoration: none;
                  text-align: center;
                "
                >{{ "GitHub" }}</a
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <el-dialog
      title="修改我的密码"
      v-model="dialogVisible"
      width="40%"
      @close="close"
    >
      <el-form
        :model="admin"
        ref="adminForm"
        label-width="100px"
        :rules="loginRules"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="admin.username" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="admin.oldPassword"
            autoComplete="on"
            placeholder="请输入旧密码"
            style="width: 100%"
          >
            <template #suffix>
              <i
                :class="[
                  pwdType == 'password' ? 'vitebiyan' : 'viteyanjing',
                  defaultData.iconfont,
                ]"
                @click="pwdType = pwdType == 'password' ? 'text' : 'password'"
              >
              </i>
            </template>
            <!-- <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span> -->
          </el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="admin.newPassword"
            autoComplete="on"
            placeholder="请输入新密码："
            style="width: 100%"
          >
            <template #suffix>
              <i
                :class="[
                  pwdType == 'password' ? 'vitebiyan' : 'viteyanjing',
                  defaultData.iconfont,
                ]"
                @click="pwdType = pwdType == 'password' ? 'text' : 'password'"
              >
              </i>
            </template>
            <!-- <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span> -->
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="确认密码：" prop="isPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="isPassword"
            autoComplete="on"
            placeholder="请输入确认密码"
            style="width: 100%"
          >
          </el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm()"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref, computed } from "vue";
import { useStore } from "vuex";
// import { updatePassword } from "@/api/logins";

import search from "./nav-right/seacrh";
import language from "./nav-right/language.vue";
import bug from "./nav-right/bug";
import fullScreen from "./nav-right/full-screen";
import size from "./nav-right/size";

import { ElMessage, ElMessageBox } from 'element-plus'

export default defineComponent({
  components: {
    search,
    language,
    bug,
    fullScreen,
    size,
  },
  setup() {
    let Store = useStore();

    // 账号头像
    let icon = computed(() => Store.state.user.userInfo.icon)

    let dialogVisible = ref(false);
    let pwdType = ref("password");
    let adminForm = ref<any | null>(null);

    let loginRules = ref({
      username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
      oldPassword: [
        { required: true, trigger: "blur", message: "请输入旧密码" },
      ],
      newPassword: [
        { required: true, trigger: "blur", message: "请输入新密码" },
      ],
    });
    let admin = reactive({
        username: "",
        oldPassword: "",
        newPassword: "",
    });

    function logout() {
      Store.dispatch("outLoing");
    }

    function close() {
      dialogVisible.value = false;
    }
    function handleDialogConfirm() {
      adminForm.value.validate((valid: boolean) => {
        if (valid) {
          ElMessageBox
            .confirm("是否确认修改密码?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
            .then(() => {
              // updatePassword(admin).then((res: any) => {
              //   if (res.code == "502") {
              //     ElMessage({
              //       message: res.message,
              //       type: "warning",
              //     });
              //   } else if (res.code == "200") {
              //     dialogVisible.value = false;
              //     ElMessage({
              //       message: "修改成功！",
              //       type: "success",
              //     });

              //     logout();
              //   }
              // });
            });
        } else {
          ElMessage({
            message: "请完善信息",
            type: "warning",
          });
          return false;
        }
      });
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
      handleDialogConfirm,
    };
  },
});
</script>

<style lang="scss">
.nav-right {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    .icon {
      width: 35px;
      height: 35px;
      display: flex;
      align-items: flex-end;
    }
    .viteIcon {
      font-size: 26px;
      color: #666;
      margin-right: 10px;
    }
    .viteIcon:focus,
    &:focus {
      outline: 0;
    }

    .viteIcon {
      font-size: 20px;
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
    }

    .viteIcon:hover {
      border-radius: 3px;
      background: #fff;
      transition: all 0.6s;
      // border-color: var(--menus-item-hover-color);
      // color: var(--menus-item-hover-color);
    }

    .searchSelect {
      border: none;
    }
  }
  .isBug {
    position: relative;

    .viteIcon {
      transition: all 0.4s;
      color: #fff;
      border-radius: 3px;
      overflow: hidden;
    }
    .viteIcon:hover {
      transition: all 0.4s;
      border-radius: 3px;
      border-color: rgba(0, 0, 0, 0);
      color: #fff;
    }

    .bugNum {
      position: absolute;
      top: -3px;
      right: 6px;
      width: 7px;
      height: 7px;
      text-align: center;
      line-height: 10px;
      display: inline-block;
      border-radius: 50%;
      border: 2px solid #fff;
    }
  }
}

.inlineBlock {
  text-decoration: none;
  color: #000;
}
</style>

<style scoped>
.item ::v-deep() .el-input__inner {
  border: none !important;
  padding-left: 0 !important;
}
.item ::v-deep() .el-select {
  border-bottom: 1px solid #ccc !important;
}
</style>