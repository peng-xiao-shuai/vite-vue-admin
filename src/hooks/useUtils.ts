import { onDeactivated, onUnmounted } from 'vue'
import { RouteRecordName } from 'vue-router'
import store from '@/store/index'

// 判断是否是销毁还是失活状态，因为 keep-alive 情况下 onUnmounted() 不会执行， 故此判断是否销毁组件
export const useDestroy = (name: RouteRecordName, cb: () => void) => {
  onDeactivated(() => {
    // 卸载
    setTimeout(() => {
      if (!store.state.user.tags.some((item) => item.name == name)) {
        cb()
      }
    }, 60)
  })

  onUnmounted(() => {
    cb()
  })
}
