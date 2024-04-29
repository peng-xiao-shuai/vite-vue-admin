/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 10:53:17
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-25 14:43:30
 * @Description:
 */
import type { UnwrapRef } from 'vue'

/**
 * 异步获取 ref 实例
 * @param {string} refName ref实例名称
 */
export const useAsyncGetRefs = <T = any>(
  refName: string,
  _proxy?: ComponentPublicInstance,
): Promise<T | null> => {
  const proxy = (_proxy ||
    getCurrentInstance()?.proxy) as ComponentPublicInstance
  return new Promise((resolve) => {
    /**
     * 递归获取 ref 实例
     */
    const getRefs = (that: typeof proxy.$) => {
      // console.log(Object.keys(that.refs), 'Object.keys(that.refs)')

      if (Object.keys(that.refs).includes(refName)) {
        resolve(that.refs[refName] as T)
        return
      } else {
        if (that.parent) getRefs(that.parent)
        else {
          resolve(null)
          return
        }
      }
    }

    onMounted(() => {
      nextTick(() => {
        if (proxy) {
          getRefs(proxy.$)
        } else {
          console.error('错误，proxy 空')
        }
      })
    })
  })
}

/**
 * 同步获取 ref 实例
 * @param {string} refName ref实例名称
 */
export const useGetRefs = <T = any>(
  refName: string,
  _proxy?: ComponentPublicInstance,
): Ref<UnwrapRef<T> | null> => {
  const proxy = (_proxy ||
    getCurrentInstance()?.proxy) as ComponentPublicInstance
  const componentRef = ref<T | null>(null)

  /**
   * 递归获取 ref 实例
   */
  const getRefs = (that: typeof proxy.$): UnwrapRef<T> | null => {
    if (Object.keys(that.refs).includes(refName))
      return that.refs[refName] as UnwrapRef<T>
    else {
      if (that.parent) return getRefs(that.parent)
      else return null
    }
  }

  nextTick(() => {
    if (proxy) {
      componentRef.value = getRefs(proxy.$)
    } else {
      console.error('错误，proxy 空')
    }
  })

  return componentRef
}
