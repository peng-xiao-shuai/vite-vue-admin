<template>
  <div style="padding:10px" class="navs">
    <div class="left">
        <div class="viteIcon el-icon-s-unfold" @click="$emit('isCollapse',collapse = !collapse)">
        </div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }" v-for="(item,index) in matched" :key='index'>{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRoute,onBeforeRouteUpdate } from 'vue-router';

export default {
    setup(){
        // onBeforeRouteUpdate((to) => {
        //     console.log(to.matched);
        // })

        let route = useRoute()
        let matched = computed(() => {
            return route.matched
        })

        let collapse = ref(true)

        console.log(collapse);
        return{
            matched,
            collapse
        }
    }
}
</script>

<style lang="scss" scoped>
    .navs{
        height: 50px;
        box-sizing: border-box;
        .left{
            display: flex;
            align-items: center;
            > div{
                margin-right: 10px;
            }
            .viteIcon{
                font-size: 22px;
            }
        }
    }
</style>