<template>
    <div class="content">
        <div :class="['left']">
            <menus :collapse='collapse'></menus>
        </div>
        <div class="right" :style="!collapse ? {marginLeft: '65px'} : {marginLeft: '200px'}">
            <div class="top">
                <navs @isCollapse='isCollapse'></navs>
                <tags-view></tags-view>
            </div>
            <div class="view">
                <transition name="fadeRouter"  mode="out-in">
                    <router-view :key="key"/>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import menus from './components/menus.vue';
import navs from './components/navs.vue';
import TagsView from './components/TagsView.vue';


export default {
    components:{
        menus,
        navs,
        TagsView
    },
    setup(){
        let collapse = ref(true)

        function isCollapse(e){
           collapse.value = e
        }

        let route = useRoute()
        let key = computed(()=>{
            return route.path
        })

        return{
            collapse,
            isCollapse,
            key
        }
    }
}
</script>

<style lang="scss" scoped>
    .fadeRouter-leave-active,
    .fadeRouter-enter-active {
        transition: all .4s;
    }

    .fadeRouter-enter-from {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fadeRouter-enter-to,
    .fadeRouter-leave{
        opacity: 1;
        transform: translateX(0);
    }

    .fadeRouter-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }

    .content{
        min-height: 100vh;
        display: flex;
        justify-content: space-between;
        .left{
            height: 100%;
            max-width: 200px;
            // position: fixed;
            // left: 0;
            // top: 0;
        }
        .right{
            // flex: 1;
            width: 100%;
            overflow: hidden;
            transition: margin-left .35s;

            .top{
                position: sticky;
                z-index: 6;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .view{
                background: #f3f3f3;
                min-height: calc(100% - 90px - 26px);
                padding: 20px;
            }
        }
    }
</style>