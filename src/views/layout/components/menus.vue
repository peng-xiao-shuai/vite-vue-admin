<template>
  <div class="menus">
    <template v-for="(item,index) in menus" :key='index'>
        <div v-if="!item.hidden" @click="navTo(item.redirect || item.path)">
            {{item.meta && item.meta.title  || item.children && item.children[0].meta.title || ''}}
        </div>
    </template>
  </div>
</template>

<script>
import router from '/@/router/index';
import store from '/@/store/index';
export default {
    name: 'menus',
    setup(){
        function navTo(e){
            console.log(e);
            router.push(e)
        }

        function outlogin(){
            store.dispatch('outLoing')
        }

        return{
            navTo,
            outlogin,

            menus: store.state.user.menus
        }
    }
}
</script>

<style lang="scss" scoped>
    .menus{
        div{
            height: 60px;
            line-height: 60px;
            background: lightblue;
            text-align: center;
            margin-bottom: 20px;
        }
    }
</style>>
