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
        <img
          style="width: 35px; height: 35px; margin-right: 5px"
          src="/src/assets/logo.svg"
        />
        <span class="logo-title" v-show="collapse">{{ systemName }}</span>
      </router-link>
      <router-link
        key="not"
        class="logo-link"
        style="text-decoration: none"
        to="/"
        v-else
      >
        <img style="width: 35px; height: 35px" src="/src/assets/logo.svg" />
      </router-link>
    </transition>
  </div>
</template>

<script>
import defaultData from '@/config/default-data'
export default {
  name: 'logo',
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      systemName: defaultData.name
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

.menus-logo {
  /* box-sizing: border-box; */
  /* padding: 10px; */
  min-height: 50px;
  width: 100%;
  height: 50px;
  overflow: hidden;
  border-bottom: 2px solid #f7f8f8;
  background: var(--menu-logo-background);
}
.logo-link {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  margin: auto;
  width: 80%;
}
.logo-title {
  margin: 0;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
  color: var(--menu-logo-color);
}
</style>