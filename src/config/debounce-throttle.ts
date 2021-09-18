/*
 * @Author: chenle 
 * @Date: 2021-09-18 22:25:34 
 * @Last Modified by:   chenle 
 * @Last Modified time: 2021-09-18 22:25:34 
 */

let timer: any;
// 只执行一次
let debounceOnly:boolean = true
/**
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button @click="debounce(callback,300)"></el-button>
*/
export const debounce = (callback: Function, time?: number, immediate?: Boolean): Function|void => {
  // 是否立即执行
  if (immediate && debounceOnly) {
    debounceOnly = false
    callback() 
  }

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    callback()
  }, time)
}


/*
 * @Author: 彭小黑 
 * @Date: 2021-09-18 21:17:44 
 * @Last Modified by:   彭小黑 
 * @Last Modified time: 2021-09-18 21:17:44 
 */
let bol:boolean = true
// 只执行一次
let throttleOnly:boolean = true
/**
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button @clicke="throttle(callback,300)"></el-button>
*/
export const throttle = (callback: Function, time?: number, immediate?: Boolean): Function|void => {
  // 是否立即执行
  if (immediate && throttleOnly) {
    throttleOnly = false
    return callback() 
  }

  if (bol) {
    bol = false
    setTimeout(() => {
      bol = true
      return callback() 
    },time)
  }
}