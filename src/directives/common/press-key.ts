/* 按键 指令
 * @Author: 彭小黑
 * @Date: 2021-07-08 10:48:10
 * @Last Modified by: peng-xiao-shuai
 * @Last Modified time: 2023-02-27 16:02:08
 */
import type { App } from 'vue'

/**
 * @param {string} arg 键码
 * @param {Function} funVal 执行的函数
 */
interface obj {
  arg: string
  funVal: Function
  id: string | number
}

interface keys {
  [s: string]: obj
}
const keys: keys = {}

/**
 * 判断类型
 * @param {Element} el
 */
type InputElement = HTMLInputElement | HTMLTextAreaElement
const ifType = (el: Element | null): InputElement | undefined => {
  if (!el) return undefined

  if (el.tagName == 'INPUT' || el.tagName == 'TEXTAREA')
    return el as InputElement

  const isElComponent =
    el.classList.contains('el-input') || el.classList.contains('el-textarea')

  const inner = isElComponent
    ? ((el.getElementsByClassName('el-input__inner')[0] ||
        el.getElementsByClassName('el-textarea__inner')[0]) as
        | InputElement
        | undefined)
    : undefined
  return inner
}

export default function pressKey(app: App) {
  app.directive('press-key', {
    mounted(el, bind) {
      // 判断是否是 input 或者 textarea 需要注意的是 el-input是一个div元素
      const inputNode = ifType(el)

      if (!bind.arg) {
        console.error('请绑定需要触发的键，例如v-press-key:s')
        return
      }

      // 获取id
      const id = Object.keys(bind.modifiers).length
        ? Object.keys(bind.modifiers)[0]
        : ''

      // 获取对象键值
      const k =
        inputNode == undefined
          ? bind.arg + (id ? '-' + id : '')
          : bind.arg + '-' + inputNode.tagName + (id ? '-' + id : '')

      if (Object.keys(keys).filter((item) => item == k).length) {
        console.error('绑定的按键 ' + bind.arg + ' 与已有的重名')
        return
      }
      // 储存数据
      keys[k] = {
        arg: bind.arg,
        funVal: bind.value,
        id,
      }

      // 绑定在input上时
      if (inputNode !== undefined) {
        inputNode.onkeydown = function keydown(event: KeyboardEvent) {
          // 获取匹配项
          const match = Object.keys(keys).filter((item) => {
            const key = item.split('-')[0]
            return (
              event.key.toUpperCase() == key ||
              event.key.toLowerCase() == key ||
              event.key == key
            )
          })

          match.length &&
            keys[
              match[0].split('-')[0] +
                '-' +
                inputNode.tagName +
                (id ? '-' + id : '')
            ].funVal()
        }

        return
      }

      window.onkeydown = function keydown(event: KeyboardEvent) {
        if (ifType(document.activeElement)) {
          return
        }
        // 获取匹配项
        const match = Object.keys(keys).filter(
          (item) =>
            event.key.toUpperCase() == item ||
            event.key.toLowerCase() == item ||
            event.key == item,
        )

        match.length && keys[match[0]].funVal()
      }
    },
  })
}
