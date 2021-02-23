<template>
  <div class="right">
    <div class="item">
        <i class="viteIcon vitesousuo-"></i>
        <el-select v-model="search" popper-class='searchSelect' filterable @change='change' placeholder="搜索菜单">
            <el-option
            v-for="item in menus"
            :key="item.path"
            :label="item.meta.title"
            :value="item.path">
            </el-option>
        </el-select>
    </div>

    <div class="item">
        <el-dropdown class="avatar-container" trigger="click">
            <div class="icon">
                <img :src="icon" alt="" style="width:100%;height:100%">
                <i class="el-icon-caret-bottom"></i>
            </div>
            <template #dropdown>
                
                <el-dropdown-menu class="user-dropdown">
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
            icon,

            change,
            logout
        }
    }
}
</script>

<style lang="scss" scoped>

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