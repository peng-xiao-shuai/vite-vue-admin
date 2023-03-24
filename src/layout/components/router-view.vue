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
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const route = useRoute()
    const caches = computed(() => userStore.tags.map((item) => item.name))
    const key = computed(() => {
      return route.path
    })

    return {
      key,
      caches,
    }
  },
})
</script>
