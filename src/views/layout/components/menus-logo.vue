<template>
    <div class="menus-logo">
        <transition name="logo">
            <router-link
            key="collapse"
            class="logo-link"
            style="text-decoration: none"
            to="/"
            v-if="collapse"
            >
                <img style="width: 35px; height: 35px;margin-right:5px" src="/src/assets/vite.png" />
                <span class="logo-title">{{ systemName }}</span>
            </router-link>
            <router-link
            key="not"
            class="logo-link"
            style="text-decoration: none"
            to="/"
            v-else
            >
                <img style="width: 35px; height: 35px" src="/src/assets/vite.png" />
            </router-link>
        </transition>
    </div>
</template>

<script>
import defalutData from '/@/config/defalut-data';
export default {
    name:'logo',
    props:{
        collapse:{
            type: Boolean,
            default: true
        }
    },
    data(){
        return{
            systemName: defalutData.name
        }
    }
};
</script>

<style scoped>
/* .logo-leave-active,.logo-enter-active{
  transition: opacity .4s;
}
.logo-enter-from,.logo-leave-to{
  opacity: 0;
}
.logo-leave-from,.logo-enter-to{
  opacity: 1;
} */

.menus-logo{
  box-sizing: border-box;
  /* padding: 10px; */
  min-height: 50px;
  width: 100%;
  background:#1CC9B5;height: 50px;color:#fff;
  overflow: hidden;
}
.logo-link{
    display: flex;
    align-items: center;
    justify-content: center;
  height: 100%;
  text-decoration: none;
  margin: auto;
  width: 80%;
}
.logo-title{
  margin: 0;
  color: #20335D;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
}
</style>