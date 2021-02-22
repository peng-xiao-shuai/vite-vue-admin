<template>
  <div>
    <el-select v-model="search" filterable @change='change' placeholder="搜索菜单">
        <el-option
        v-for="item in menus"
        :key="item.path"
        :label="item.meta.title"
        :value="item.path">
        </el-option>
    </el-select>
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

        let search = ref('')

        let router = useRouter()
        function change(e){
            router.push({
                path: e
            })
        }

        return{
            menus,
            search,

            change
        }
    }
}
</script>

<style>
</style>