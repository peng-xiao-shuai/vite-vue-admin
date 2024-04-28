/**
 * @author: peng-xiao-shuai
 * @date: 2023-09-25 14:24:00
 * @last Modified by: peng-xiao-shuai
 * @last Modified time: 2023-09-25 14:24:00
 */

let timer: any
// 只执行一次
let debounceOnly = true
/**
 * 防抖
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param arg - callback 参数
 * @param immediate - 开始时还是结束时 默认 true 开始时, false 开始时
 * @example
    <button onClick={() => debounce(callback)}></button>
    <button onClick={() => debounce(callback, 200)}></button>
    <button onClick={() => debounce(callback, 200, [], false)}></button>
 */
export const debounce = (
  callback: Function,
  time?: number,
  arg?: any[],
  immediate = true
): void => {
  const args = arg ? arg : []
  // 是否立即执行
  if (immediate && debounceOnly) {
    debounceOnly = false
    callback(...(args as []))
  }

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    if (!debounceOnly) {
      debounceOnly = true
      return
    }
    callback(...(args as []))
  }, time || 300)
}

/**
 * 创建防抖函数，适用于多个地方调用 debounce 而导致 debounce 只执一次，因为 debounceOnly 被占用
 * @returns [debounce, clear] debounce 防抖函数，clear 清除内存
 */
export function createDebounce(): [typeof debounce, Function] {
  let timer: any
  let debounceOnly = true

  return [
    function debounce(
      callback: Function,
      time = 300,
      arg?: any[],
      immediate = true
    ): void {
      const args = arg || []
      // 是否立即执行
      if (immediate && debounceOnly) {
        debounceOnly = false
        callback(...args)
      }

      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if (!immediate) {
          callback(...args)
        }
        debounceOnly = true
      }, time)
    },
    function () {
      if (timer) {
        clearTimeout(timer)
      }
    },
  ]
}

let bol = true
// 只执行一次
let throttleOnly = true
/**
 * 节流
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param arg - callback 参数
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button @click="throttle(callback,300)"></el-button>
 */
export const throttle = (
  callback: () => void,
  time?: number,
  arg?: any[],
  immediate = true
): void => {
  const args = arg ? arg : []

  // 是否立即执行
  if (immediate && throttleOnly) {
    throttleOnly = false
    callback(...(args as []))
  }

  if (bol) {
    bol = false
    setTimeout(() => {
      bol = true
      callback(...(args as []))
    }, time || 300)
  }
}
