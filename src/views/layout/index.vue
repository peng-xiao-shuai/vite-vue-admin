<template>
    <div class="content">
        <div class="left">
            <menus></menus>
        </div>
        <div class="right">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import menus from './components/menus.vue';
export default {
    components:{
        menus
    },
    setup(){

    }
}
</script>

<style lang="scss" scoped>
    .content{
        display: flex;
        justify-content: space-between;
        .left{
            width: 300px;
        }
        .right{
            flex: 1;
        }
    }
</style>