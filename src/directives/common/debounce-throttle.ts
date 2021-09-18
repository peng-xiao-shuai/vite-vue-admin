/*
 * 防抖指令
 * @Author: chenle
 * @Date: 2021-09-17 17:11:58
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-18 22:18:39
 */

import type { App } from 'vue';

/**
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param arg - 参数
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button v-debounce="[callback,300]"></el-button>
*/
export function debounce(app: App) {
  app.directive('debounce', {
    mounted(el, binding) {
      let [callback, time = 300, arg = [], immediate = false]:[Function, number, any[], boolean] = binding.value
      let timer: any;
      // 只执行一次
      let only:boolean = true
      
      el.addEventListener("click", () => {
        // 是否立即执行
        if (immediate && only) {
          only = false
          callback(...arg) 
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          callback(...arg)
        }, time)
      })
    }
  })
}

/* 节流指令
 * @Author: 彭小黑 
 * @Date: 2021-09-18 20:54:53 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-18 20:56:10
 */

/**
 * @param callback - 回调事件(必传)
 * @param time - 间隔时间，默认300
 * @param arg - 参数
 * @param immediate - 开始时还是结束时 默认false结束时, true开始时
 *  例：<el-button v-throttle="[callback,300]"></el-button>
*/
export function throttle(app: App) {
  app.directive('throttle', {
    mounted(el, binding) {
      let [callback, time = 300, arg = [], immediate = false]:[Function, number, any[], boolean] = binding.value

      let bol:boolean = true
      // 只执行一次
      let only:boolean = true
      el.addEventListener("click", () => {
        // 是否立即执行
        if (immediate && only) {
          only = false
          callback(...arg) 
        }

        if (bol) {
          bol = false
          setTimeout(() => {
            bol = true
            callback(...arg) 
          },time)
        }
      })
    }
  })
}