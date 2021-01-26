<template>
  <div class="home">
    <span>{{count}}</span>
    <img alt="Vue logo" src="@/assets/logo.png" @click="add">
    <HelloWorld msg="Welcome to Your Vue.js App" @hook:mounted = 'worldMounted'/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '/@/components/HelloWorld.vue'
import { onMounted, ref,getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus'
import router from '/@/router/index';
import store from '../../store';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    let count = ref(0)
    const { ctx } = getCurrentInstance() // 获取上下文，类似原来的this
    // onMounted(()=>{
		// 	router.replace({path: '/login'})
    // })

    let add = () =>{
      ctx.$message({type: 'warning',message:'123'})
      // ElMessage({type: 'warning',message:'123'})
      count.value++
    }

    function worldMounted(e){
      console.log(e,111);
    }

    return{
      count,
      add,
      worldMounted,
    }
  }
}
</script>
