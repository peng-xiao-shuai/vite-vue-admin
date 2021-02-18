<template>
  <div class="tags">
    <transition-group name="tags">
        <span @click="navTo(item)" :class="['tag',{active:currentName == item.name}]" :style="currentName == item.name ? {background: themeColor} : {}" v-for="(item,index) in tags" :key='index'>
            {{item.name}}
            <i v-if="!item.remove" class="el-icon-close" @click.stop="remove(index)"></i>
        </span>
    </transition-group>
  </div>
</template>

<script>
import store from "/@/store/index";
import { computed, reactive, ref, watch,toRaw } from 'vue';
import { useRoute,useRouter } from 'vue-router';

export default {
    setup(){
        let tags = store.state.user.tags
        let route = useRoute()
        let router = useRouter()

        // 当前路由name
        let currentName = ref()

        watch(route,(val)=>{
            currentName.value = val.name
            // 获取tags
            let isExist = tags.filter(item => item.name == currentName.value).length > 0 ? true : false
            let to = JSON.parse(JSON.stringify(val))
            console.log(to);
            if(!isExist && val.name !== "redirect"  && val.name !== "404"){
                store.commit('tagsCommit',{to})
            }
        },{
            immediate:true
        })

        function remove(i){
            if(tags[i].name === currentName.value){
                router.push({
                    name:tags[i-1].name,
                    params:tags[i-1].params,
                    query:tags[i-1].query
                })
            }

            store.commit('tagsCommit',{removeIndex: i})

        }

        function navTo(item){
            if(item.name === currentName.value){
                // 手动重定向页面到 '/redirect' 页面
                console.log(route);
                router.replace({
                    name: 'redirect',
                    params:{
                        ...item.params,
                        __name:item.name
                    },
                    query:item.query
                })

                return
            }

            router.push({
                name:item.name,
                params:item.params,
                query:item.query
            })
        }

        return {
            tags,
            remove,
            currentName,
            navTo
        }
    }
}
</script>

<style lang='scss'>
.tags{
    padding: 7px 10px;
    border-top: 1px solid #eee;
    display: flex;


    // .animation{
        display: flex;

        .tag{
            padding: 4px 8px;
            height: 25px;
            line-height: 25px;
            box-sizing: border-box;
            background: #fff;
            border-radius: 5px;
            border: 1px solid #ccc;
            margin-right: 5px;
            display: flex;
            align-items: center;
            font-size: 12px;
            position: relative;

            i{
                color: #ccc;
                font-size: 8px;
                transition: all .3s;
                margin-left: 5px;
                padding: 1px;
                border-radius: 50%;
                transform : scale(0.7) ;
                *font-size:10px;
            }

            .el-icon-close:hover{
                background: #acacac;
                color: #fff;
            }
        }

        .tag::after{
            content: "";
            display: block;
            height: 50%;
            // border-right: 1px solid #ccc;
            position: absolute;
            right: 0;
        }

        .active{
            color: #fff;
            position: relative;
            transition: all .2s;
            border-radius: 5px;
            border: none;

            i{
                color: #fff;
            }

            .el-icon-close:hover{
                background: #fff;
                color: #1CC9B5;
            }
        }

        // .active::after{
        //     content: '';
        //     width: 200%;
        //     height: 50%;
        //     display: block;
        //     position: absolute;
        //     right: -50%;
        //     bottom: 0;
        //     border: none;
        //     background: #1CC9B5;
        //     z-index: -1;
        // }
        
    // }
}

.tags-enter-active, .tags-leave-active {
    transition: all .3s;
}
.tags-enter-to{
    transform: translateX(0px);
    opacity: 1;

}
.tags-enter-from, .tags-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>