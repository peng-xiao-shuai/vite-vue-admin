<template>
    <div class="content">
        <div class="left">
            <menus :collapse='collapse'></menus>
        </div>
        <div class="right">
            <div class="top">
                <navs @isCollapse='isCollapse'></navs>
            </div>
            <div class="view">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import menus from './components/menus.vue';
import navs from './components/navs.vue';

export default {
    components:{
        menus,
        navs
    },
    setup(){
        let collapse = ref(true)

        function isCollapse(e){
           collapse.value = e
        }

        return{
            collapse,
            isCollapse
        }
    }
}
</script>

<style lang="scss" scoped>
    .content{
        min-height: 100vh;
        display: flex;
        justify-content: space-between;
        .left{
            max-width: 200px;
        }
        .right{
            // flex: 1;
            width: 100%;

            .top{
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            }

            .view{
                background: #f3f3f3;
                min-height: calc(100% - 50px);
                padding: 20px;
            }
        }
    }
</style>