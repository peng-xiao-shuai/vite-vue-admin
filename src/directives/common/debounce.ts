/*
 * 防抖指令
 * @Author: chenle
 * @Date: 2021-09-17 17:11:58
 * @Last Modified by: chenle
 * @Last Modified time: 2021-09-17 18:22:36
 */

import type { App } from 'vue';

/* 
 * @param fn - 回调事件(必传)
 * @param time - 间隔时间，默认300
 *  例：<el-button v-debounce="[reset,300]"></el-button>
*/
export default function pressKey(app: App) {
  app.directive('debounce', {
    mounted(el, binding) {
      let [fn, time = 300] = binding.value
      let timer: any;
      el.addEventListener("click", () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn()
        }, time)
      })
    }
  })
}