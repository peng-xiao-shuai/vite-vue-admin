<template>
  <div class="right">
    <div class="item">
        <i class="viteIcon vitesousuo-" @click="isSearch = !isSearch"></i>
        <transition name='navSearch'>
            <el-select v-show="isSearch" v-model="search" popper-class='searchSelect' filterable @change='change' placeholder="搜索菜单">
                <el-option
                v-for="item in menus"
                :key="item.path"
                :label="item.meta.title"
                :value="item.path">
                </el-option>
            </el-select>
        </transition>
    </div>

    <div class="item">
        <el-dropdown class="avatar-container" trigger="click">
            <div class="icon">
                <img :src="icon" alt="" style="width:100%;height:100%">
                <i class="el-icon-caret-bottom"></i>
            </div>
            <template #dropdown>
                
                <el-dropdown-menu class="user-dropdown">
                    <el-dropdown-item>
                        <span span @click="dialogVisible = !dialogVisible" style="display:block;">修改密码</span>
                    </el-dropdown-item>
                    <router-link class="inlineBlock" to="/">
                        <el-dropdown-item>
                            首页
                        </el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span span @click="logout" style="display:block;">退出</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

    <el-dialog title="修改我的密码" v-model:visible="dialogVisible" width="40%" @close="close">
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small" :rules="loginRules">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="旧密码：" prop="oldPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="admin.oldPassword"
            autoComplete="on"
            placeholder="请输入旧密码"
            style="width: 250px"
          >
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="admin.newPassword"
            autoComplete="on"
            placeholder="请输入新密码："
            style="width: 250px"
          >
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="isPassword">
          <el-input
            name="password"
            :type="pwdType"
            v-model="isPassword"
            autoComplete="on"
            placeholder="请输入确认密码"
            style="width: 250px"
          >
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm('adminForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default {
    setup(){
        let Store = useStore()

        let menus = Store.state.user.menus.filter(item => !item.hidden)
        let icon = Store.state.user.userInfo.icon

        let search = ref('')

        let router = useRouter()
        function change(e){
            router.push({
                path: e
            })
        }

        function logout(){
            Store.dispatch('outLoing')
        }

        return{
            menus,
            search,
            isSearch:ref(false),
            icon,

            change,
            logout
        }
    }
}
</script>

<style lang="scss" scoped>

.navSearch-enter-active, .navSearch-leave-active {
    transition: width .3s;
}
.navSearch-enter-to,.navSearch-leave-from{
    width: 200px;
    // transform: translateX(0px);

}
.navSearch-enter-from, .navSearch-leave-to {
    width: 0px;
    // transform: translateX(30px);
}

.right{
    display: flex;
    align-items: center;
    .item{
        display: flex;
        align-items: center;
        margin-right: 10px;

        .searchSelect{
            border: none;
        }

    }
    .icon{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: flex-end;

    }
}

.viteIcon{
    font-size: 26px;
    color: #666;
    margin-right: 10px;
}

.inlineBlock{
    text-decoration: none;
    color: #000;
}
</style>

<style scoped>
.item /deep/ .el-input__inner{
    border: none !important;
    padding-left: 0 !important;

}
.item /deep/ .el-select{
    border-bottom: 1px solid #ccc !important;
}
</style>