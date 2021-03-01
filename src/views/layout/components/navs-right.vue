<template>
  <div class="right">
    <!-- 搜索 -->
    <div class="item">
      <i class="viteIcon vitesousuo-" @click="isSearch = !isSearch"></i>
      <transition name="navSearch">
        <el-select
          v-show="isSearch"
          v-model="search"
          popper-class="searchSelect"
          filterable
          @change="change"
          placeholder="搜索菜单"
        >
          <el-option
            v-for="item in menus"
            :key="item.path"
            :label="item.meta.title"
            :value="item.path"
          >
          </el-option>
        </el-select>
      </transition>
    </div>
    <!-- 全屏 -->
    <div class="item">
      <i
        :class="[
          'viteIcon',
          !isRfs ? 'vitefullScreen' : 'vitecancel-full-screen',
        ]"
        @click="click"
      ></i>
    </div>
    <!-- 用户 -->
    <div class="item">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="icon">
          <img :src="icon" alt="" style="width: 100%; height: 100%" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item>
              <span
                span
                @click="dialogVisible = !dialogVisible"
                style="display: block"
                >修改密码</span
              >
            </el-dropdown-item>
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item> 首页 </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span span @click="logout" style="display: block">退出</span>
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
        size="small"
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
                  'viteIcon',
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
                  'viteIcon',
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
          <el-button @click="dialogVisible = false" size="small"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="handleDialogConfirm('adminForm')"
            size="small"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { updatePassword } from "/@/api/logins";

import screenfull from "screenfull";

export default defineComponent({
  setup() {
    let Store = useStore();
    let _this = getCurrentInstance().ctx;
    let menus = Store.state.user.menus.filter((item) => !item.hidden);
    let isRfs = ref(false);
    // 账号头像
    let icon = Store.state.user.userInfo.icon;

    let search = ref("");
    let dialogVisible = ref(false);
    let pwdType = ref("password");
    let adminForm = ref(null);

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
      value: {
        username: "",
        oldPassword: "",
        newPassword: "",
      },
    });

    let router = useRouter();
    function change(e) {
      router.push({
        path: e,
      });
    }
    //全屏
    function click() {
      if (!screenfull.isEnabled) {
        _this.$message({
          message: "您的浏览器不支持！",
          type: "warning",
        });
        return false;
      }
      screenfull.toggle();
    }
    function rfsChange() {
      isRfs.value = screenfull.isFullscreen;
    }
    function init() {
      if (screenfull.isEnabled) {
        screenfull.on("change", rfsChange);
      }
    }
    function destroy() {
      if (screenfull.isEnabled) {
        screenfull.off("change", rfsChange);
      }
    }
    // end

    function logout() {
      Store.dispatch("outLoing");
    }

    function close(e) {
      dialogVisible.value = false;
    }
    function handleDialogConfirm(formName) {
      adminForm.value.validate((valid) => {
        if (valid) {
          _this
            .$confirm("是否确认修改密码?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
            .then(() => {
              // if (_this.admin.newPassword != _this.isPassword) {
              // _this.$message({
              //     message: '新密码与确认密码不一致',
              //     type: 'warning'
              // });
              // }
              updatePassword(_this.admin).then((res) => {
                if (res.code == "502") {
                  _this.$message({
                    message: res.message,
                    type: "warning",
                  });
                } else if (res.code == "200") {
                  _this.dialogVisible = false;
                  _this.$message({
                    message: "修改成功！",
                    type: "success",
                  });

                  _this.logout();
                }
              });
            });
        } else {
          _this.$message({
            message: "请完善信息",
            type: "warning",
          });
          return false;
        }
      });
    }

    init()

    return {
      menus,
      search,
      icon,
      dialogVisible,
      admin,
      pwdType,
      loginRules,
      adminForm,
      isSearch: ref(false),
      isRfs,

      change,
      click,
      rfsChange,
      init,
      destroy,
      close,
      logout,
      handleDialogConfirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.navSearch-enter-active,
.navSearch-leave-active {
  transition: width 0.3s;
}
.navSearch-enter-to,
.navSearch-leave-from {
  width: 200px;
  // transform: translateX(0px);
}
.navSearch-enter-from,
.navSearch-leave-to {
  width: 0px;
  // transform: translateX(30px);
}

.right {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    margin-right: 10px;

    .viteIcon {
      font-size: 22px;
      position: sticky;
    }

    .searchSelect {
      border: none;
    }
  }
  .icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: flex-end;
  }
}

.viteIcon {
  font-size: 26px;
  color: #666;
  margin-right: 10px;
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