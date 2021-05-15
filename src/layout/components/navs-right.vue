<template>
  <div class="nav-right">
    <!-- 搜索 -->
    <div class="item">
      <el-tooltip :content="t('search')" placement="bottom">
        <i class="viteIcon vitesousuo-" @click="isSearch = !isSearch"></i>
      </el-tooltip>

      <transition name="navSearch">
        <el-select
          v-show="isSearch"
          v-model="search"
          popper-class="searchSelect"
          filterable
          @change="change"
          :placeholder="t('search.menus')"
        >
          <el-option
            v-for="item in menus"
            :key="item.path"
            :label="item.path"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </transition>
    </div>

    <!-- 语言 -->
    <div class="item">
      <el-dropdown class="avatar-container" trigger="hover">
        <div
          :class="[
            'viteIcon',
            locale == 'en-US' ? 'vitelanguage2' : 'vitelanguage2',
          ]"
        ></div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item
              @click="setLocale(item.value)"
              v-for="(item, index) in localeSelect"
              :key="'locale' + index"
            >
              <div
                :style="{
                  color: locale == item.value ? themeColor : '#666',
                }"
              >
                <i
                  class="r"
                  :style="
                    locale == item.value
                      ? {
                          borderColor: themeColor,
                          background: themeColor,
                        }
                      : {}
                  "
                ></i>
                {{ item.label }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- bug -->
    <el-tooltip
      :content="t('log') + ' / ' + $store.getters.getBugNumber"
      placement="bottom"
    >
      <div :class="['item', { isBug: $store.getters.getBugNumber !== 0 }]">
        <i
          :class="['viteIcon', !isRfs ? 'vitebug' : 'vitebug']"
          @click="click"
        ></i>

        <span class="bugNum"></span>
      </div>
    </el-tooltip>

    <!-- 组件大小 -->
    <div class="item">
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="viteIcon vitefont-size"></div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item
              @click="setSize(item.value)"
              v-for="(item, index) in sizeSelect"
              :key="index"
            >
              <div :style="{ color: size == item.value ? themeColor : '#666' }">
                <i
                  class="r"
                  :style="
                    size == item.value
                      ? {
                          borderColor: themeColor,
                          background: themeColor,
                        }
                      : {}
                  "
                ></i>
                {{ t(item.label) }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 全屏 -->
    <el-tooltip :content="t('full.screen')" placement="bottom">
      <div class="item">
        <i
          :class="[
            'viteIcon',
            !isRfs ? 'vitefullScreen' : 'vitecancel-full-screen',
          ]"
          @click="click"
        ></i>
      </div>
    </el-tooltip>
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogConfirm('adminForm')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang='ts'>
const w = window;
import Cookies from "js-cookie";

import { defineComponent, inject, reactive, ref, shallowRef } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { updatePassword } from "/@/api/logins";
import { SETLOCALE } from "/@/language";

import screenFull from "screenfull";
import defaultData from "/@/config/defalut-data";

export default defineComponent({
  setup() {
    const message = inject<any>("$message");
    const messageBox = inject<any>("messageBox");
    let Store = useStore();

    let menu: [] = [];
    let menus: any = searchMenusFun(Store.state.user.menus, menu);
    let isRfs = ref(false);
    // 账号头像
    let icon = Store.state.user.userInfo.icon;

    let search = ref("");
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
      value: {
        username: "",
        oldPassword: "",
        newPassword: "",
      },
    });

    let router = useRouter();
    let route = useRoute();
    const screenfull: any = screenFull;
    function change(e: string) {
      router.push({
        name: e,
      });
    }

    function searchMenusFun(arr: any[], menu: any[], superior?: any) {
      arr.forEach((each: any) => {
        let item: any = JSON.parse(JSON.stringify(each));
        if (!item.hidden && item.name) {
          if (item.children) {
            item.path = superior ? superior.path + " /" + item.path : item.path;
            menu.push(item);
            menu.concat(searchMenusFun(item.children, menu, item));
          } else {
            item.path = superior.path + " /" + item.path;
            menu.push(item);
          }
        }
      });
      return menu;
    }
    //全屏
    function click() {
      if (!screenfull.isEnabled) {
        message({
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

    function close() {
      dialogVisible.value = false;
    }
    function handleDialogConfirm() {
      adminForm.value.validate((valid: any) => {
        if (valid) {
          messageBox
            .confirm("是否确认修改密码?", "提示", {
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
              updatePassword(admin).then((res: any) => {
                if (res.code == "502") {
                  message({
                    message: res.message,
                    type: "warning",
                  });
                } else if (res.code == "200") {
                  dialogVisible.value = false;
                  message({
                    message: "修改成功！",
                    type: "success",
                  });

                  logout();
                }
              });
            });
        } else {
          message({
            message: "请完善信息",
            type: "warning",
          });
          return false;
        }
      });
    }

    let size = ref(Cookies.get("size") || "small");
    let sizeSelect = [
      {
        value: "default",
        label: "default",
      },
      {
        value: "medium",
        label: "medium",
      },
      {
        value: "small",
        label: "small",
      },
      {
        value: "mini",
        label: "mini",
      },
    ];
    // 修改组件大小
    function setSize(e: string) {
      Cookies.set("size", e);
      size.value = e;

      // let params: any = route.params;
      // router.replace({
      //   name: "redirect",
      //   params: {
      //     ...params,
      //     __name: route.name,
      //   },
      //   query: route.query,
      // });
      message.success("修改成功！即将刷新网页");
      setTimeout(() => {
        w.location.reload();
      }, 800);
    }

    const localeSelect = ref([
      {
        value: "zh-CN",
        label: "中文",
      },
      {
        value: "en-US",
        label: "English",
      },
    ]);

    let locale = defaultData.locale;

    function setLocale(val: string) {
      SETLOCALE(val);
    }

    init();

    return {
      menus,
      search,
      icon,
      dialogVisible,
      admin,
      pwdType,
      loginRules,
      adminForm,
      localeSelect,
      isSearch: ref(false),
      isRfs,
      sizeSelect,
      locale,
      size,

      change,
      setLocale,
      setSize,
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
.nav-right {
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;

    .viteIcon:focus,
    &:focus {
      outline: 0;
    }

    .viteIcon {
      font-size: 20px;
      padding: 5px;
      border: 1px solid transparent;
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

  .icon {
    width: 35px;
    height: 35px;
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

.r {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #999;
  display: inline-block;
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