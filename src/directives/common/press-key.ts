/* 按键 指令
 * @Author: 彭小黑
 * @Date: 2021-07-08 10:48:10
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-02 17:25:22
 */
import type { App } from 'vue';

/**
 * @param {string} arg 键码
 * @param {Function} funVal 执行的函数
 */
interface obj {
  arg: string,
  funVal: Function,
  id: string | number
}

interface keys {
  [s: string]: obj
}
const keys: keys = {}

// 判断类型
const ifType = (el:Element):boolean => {
  return el.tagName == 'INPUT' || el.tagName == 'TEXTAREA'
}

export default function pressKey(app: App) {
  app.directive('press-key', {
    mounted(el, bind) {
      
      // 判断是否是 input 或者 textarea 由于 el-input是一个div元素且它的下级才是input 故此获取children
      const inputNode = ifType(el) ? el : el.children.length && ifType(el.children[0]) ? el.children[0] : undefined

      if (!bind.arg) {
        console.error('请绑定需要触发的键，例如v-press-key:s');
        return
      }

      if (Object.keys(keys).filter(item => item == bind.arg).length) {
        console.error('绑定的按键 ' + bind.arg + ' 与已有的重名');
        return
      }

      // 获取id
      const id = Object.keys(bind.modifiers).length ? Object.keys(bind.modifiers)[0] : ''

      // 获取对象键值
      const k = inputNode == undefined ? bind.arg : bind.arg + '-' + inputNode.tagName + (id ? '-' + id : '')
      // 储存数据
      keys[k] = {
        arg: bind.arg,
        funVal: bind.value,
        id
      }

      // 绑定在input上时
      if(inputNode !== undefined){
        inputNode.onkeydown = function keydown(event: KeyboardEvent) {
          // 获取匹配项
          const match = Object.keys(keys).filter(item => {
            const key = item.split('-')[0]
            return event.key.toUpperCase() == key || event.key.toLowerCase() == key || event.key == key
          })
        
          match.length &&  keys[match[0].split('-')[0] + '-' +inputNode.tagName + (id ? '-' + id : '')].funVal()
        }
        
        return
      }

      window.onkeydown = function keydown(event: KeyboardEvent) {
        // 获取匹配项
        const match = Object.keys(keys).filter(item => event.key.toUpperCase() == item || event.key.toLowerCase() == item || event.key == item)

        match.length && keys[match[0]].funVal()
      }
    }
  })
}