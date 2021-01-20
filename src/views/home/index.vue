<template>
  <div class="home">
    <span>{{count}}</span>
    <div @click="outlogin">登出</div>
    <img alt="Vue logo" src="@/assets/logo.png" @click="add">
    <HelloWorld msg="Welcome to Your Vue.js App" @hook:mounted = 'worldMounted'/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '/@/components/HelloWorld.vue'
import { ref } from 'vue';
import store from '../../store';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup(){
    let count = ref(0)

    let add = () =>{
      count.value++
    }

    function worldMounted(e){
      console.log(e,111);
    }

    function outlogin(){
      store.dispatch('outLoing')
    }

    return{
      count,
      add,
      outlogin,
      worldMounted
    }
  }
}
</script>
