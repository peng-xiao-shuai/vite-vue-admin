/* 按键 指令
 * @Author: 彭小黑
 * @Date: 2021-07-08 10:48:10
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-01 08:41:45
 */
import type { App } from 'vue';

/**
 * @param {string} arg 键码
 * @param {Function} funVal 执行的函数
 */
interface obj {
  arg: string,
  funVal: Function
}

interface keys {
  [s: string]: obj
}
const keys: keys = {}

// 只存储键名 例如['a','s','d']
const keysArr: string[] = []

export default function pressKey(app: App) {
  app.directive('press-key', {
    mounted(el, bind) {
      if (!bind.arg) {
        console.error('请绑定需要触发的键，例如v-press-key:s');
        return
      }

      if (keysArr.indexOf(bind.arg) !== -1) {
        console.error('绑定的按键 ' + bind.arg + ' 与已有的重名');
        return
      }

      // 储存数据
      keys[bind.arg] = {
        arg: bind.arg,
        funVal: bind.value,
      }

      // 判断是否储存了 键名
      keysArr.indexOf(bind.arg) == -1 ? keysArr.push(bind.arg) : ''

      window.onkeydown = function keydown(event: KeyboardEvent) {
        // 获取匹配项
        const match = keysArr.filter(item => event.key.toUpperCase() == item || event.key.toLowerCase() == item || event.key == item)
        console.log(match);

        if (match.length) {
          keys[match[0]].funVal()
        }
      }
    }
  })
}