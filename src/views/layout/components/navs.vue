<template>
  <div style="padding:5px 10px" class="navs">
    <div class="left">
        <i :class="['el-icon-s-unfold',collapse ? 'collapse' :'']" @click="$emit('isCollapse',collapse = !collapse)">
        </i>
        <el-breadcrumb separator="/">
            <transition-group name="list">
                <!-- <span v-for="(item,index) in matched" :key='index'>
                    {{item.meta.title}}{{index}}
                </span> -->
                <el-breadcrumb-item :to="{ path: item.path }" v-for="(item,index) in matched" :key='index'>   
                    <span v-if="item.redirect" class="no-redirect">{{item.meta.title}}</span>
                    <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>

    <navs-right></navs-right>
  </div>
</template>

<script>
import { computed, reactive, ref, watch,watchEffect } from 'vue';
import { useRoute,onBeforeRouteUpdate } from 'vue-router';

import navsRight from './navs-right.vue';

export default {
    components:{
        navsRight
    },
	emits:{
		"isCollapse":null
	},
    setup(){
        let route = useRoute()
		let matched = []
		matched = computed(() => {
			let arr = route.matched
			if (arr[0].path !== '/') {
				arr = [{ path: '/', meta: { title: '首页' }}].concat(route.matched)
			}

			return arr.filter(item => item.meta && item.meta.title && !item.meta.breadcrumb)
		})
		// let matched = reactive({
		// 	value:[]
		// })
		// watch(route,()=>{
		// 	console.log(route);
		// 	let arr = route.matched
		// 	if (arr[0].path !== '/') {
		// 		arr = [{ path: '/', meta: { title: '首页' }}].concat(route.matched)
		// 	}

		// 	matched = arr

		// 	console.log(matched);
		// },{
		// 	immediate:true,
		// 	deep:true
		// })

		// watchEffect(() => {
		// 	let arr = route.matched
		// 	if (arr[0].path !== '/') {
		// 		arr = [{ path: '/', meta: { title: '首页' }}].concat(route.matched)
		// 	}
		// 	matched.value = arr	
		// })
        let collapse = ref(true)
		console.log(matched);

        return{
            matched,
			collapse,
        }
    }
}
</script>

<style lang="scss" scoped>
    .navs{
        height: 50px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            > div{
                margin-right: 10px;
            }
            i{
				font-size: 22px;
				margin-right: 5px;
				transition: all 0.4s;
			}
			.collapse{
				transform: rotate(-180deg);
			}
        }
    }
    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
		transition: all .3s;
    }
    .list-enter-from, .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>