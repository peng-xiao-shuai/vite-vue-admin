/* 数字 指令
 * @Author: 彭小黑 
 * @Date: 2021-07-08 10:48:10 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-07-08 15:04:06
 */
import type { App } from 'vue';

let inputNode: HTMLElement

const float = (arg: string = 'number', modifiers?: any) => {
  inputNode.addEventListener('input', (e: Event) => {
    const keys = Object.keys(modifiers)

    let value = (e.target as any).value.replace(/[a-z]|[\u4e00-\u9fa5]|[^\x00-\xff]/ig, '') || ''

    // 为空说明只输入了 '/[a-z]|[\u4e00-\u9fa5]|[^\x00-\xff]/ig' 可以匹配的字符
    // 第一位不能为小数点
    if (!value || value === '.') {
      (e.target as any).value = ''
      return
    }

    if (arg == 'float') {
      // 只能有一位小数点
      // 小数长度 不能 大于 Number(keys[0]
      if (value.split('.').length > 2 || value.substr(value.indexOf('.') + 1, value.length).length > (Number(keys[0] || 2))) {
        // console.log('一位小数点出现2为', value, value.split('.').length);
        (e.target as any).value = value.substr(0, value.length - 1)
        return
      }

      value = value.indexOf('.') == -1 ? Number(value).toFixed((keys && Number(keys[0])) || 2) : value
    } else {
      value = Number(value)
    }
    (e.target as any).value = value

  })
}

export default function num(app: App) {
  app.directive('num', {
    // 在绑定元素的父组件挂载之前调用
    beforeMount(el, binding) {
      if (binding.arg && ['number', 'float'].indexOf(binding.arg) === -1) {
        console.error('传递给指令的参数只能为 number,float')
        return
      }
      // 获取input标签元素
      inputNode = el.tagName === 'INPUT' ? el : el.children[0]
      float(binding.arg, binding.modifiers)
    }
  })
}