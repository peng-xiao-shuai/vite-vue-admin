<template>
  <router-view v-slot="{ Component }">
    <transition name="fadeRouter" mode="out-in">
      <keep-alive :include="caches">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup () {
    let Store = useStore()
    let route = useRoute()
    let caches = computed(() => Store.state.user.tags.map(item => item.name))
    let key = computed(() => {
      return route.path
    })

    return {
      key,
      caches
    }
  }
})
</script>