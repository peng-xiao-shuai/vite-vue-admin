import store from '@/store/index'

/**
 * @param {string|string[]} value 权限值
 * @param {} all 是否全部匹配
 */
export const permissionFun = (val: string[]|string ,all = false) => {
  // 获取当前用户权限
  const roles = store.getters.getUserInfo.roles

  if (!roles || !val) {
    throw new Error(`roles 或 val 不能为空`)
  }

  // 对字符串的兼容
  const value = val instanceof Array ? val : [val]

  const hasPermission = value.filter((role:string) => roles.includes(role))
  
  if (all ? value.length !== hasPermission.length : !hasPermission.length) {
    return false
  }

  return true
}