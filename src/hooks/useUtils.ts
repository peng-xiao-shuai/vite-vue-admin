import { onDeactivated, onUnmounted } from 'vue'
import { RouteRecordName } from 'vue-router'
import { useUserStore } from '@/stores/index'

// 判断是否是销毁还是失活状态，因为 keep-alive 情况下 onUnmounted() 不会执行， 故此判断是否销毁组件
export const useDestroy = (name: RouteRecordName, cb: () => void) => {
  const userStore = useUserStore()
  onDeactivated(() => {
    // 卸载
    setTimeout(() => {
      if (!userStore.tags.some((item) => item.name == name)) {
        cb()
      }
    }, 60)
  })

  onUnmounted(() => {
    cb()
  })
}
