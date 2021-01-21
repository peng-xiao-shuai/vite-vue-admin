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
import { onMounted, ref } from 'vue';
import router from '/@/router/index';
import store from '../../store';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    let count = ref(0)

    // onMounted(()=>{
		// 	router.replace({path: '/login'})
    // })

    let add = () =>{
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
