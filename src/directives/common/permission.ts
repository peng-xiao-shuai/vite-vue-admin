/* 权限指令
 * @Author: 彭小黑 
 * @Date: 2021-10-01 15:25:29 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-10-01 22:26:28
 */

import type { App } from 'vue';
import store from '@/store/index'

/**
 * @param {string|string[]} bind.value 权限值
 * @param {} all 参数传递给指令 例如 v-permission:all
 */

export default function permission(app: App) {
  app.directive('permission', (el, bind) => {
    // 是否需要全部满足
    const all = bind.arg
    
    // 获取当前用户权限
    const roles = store.getters.getUserInfo.roles

    if (!roles || !bind.value) {
      throw new Error(`roles 或 bind.value 不能为空`)
    }

    // 对字符串的兼容
    const value = bind.value instanceof Array ? bind.value : [bind.value]

    const hasPermission = value.filter((role:string) => roles.includes(role))
    
    if (all ? value.length !== hasPermission.length : !hasPermission.length) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  })
}