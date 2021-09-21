/* 数字 指令
 * @Author: 彭小黑 
 * @Date: 2021-07-08 10:48:10 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-09-20 14:46:11
 */
import type { App } from 'vue';

let inputNode: HTMLElement

const float = (arg: string = 'number', modifiers?: {}, vals?: (number | string)[]) => {
  inputNode.addEventListener('input', (e: Event) => {
    const keys = Object.keys(modifiers || {})

    let value = (e.target as any).value.replace(/[a-z]|[\u4e00-\u9fa5]|[^\x00-\xff]/ig, '') || ''

    // 为空说明只输入了 '/[a-z]|[\u4e00-\u9fa5]|[^\x00-\xff]/ig' 可以匹配的字符
    // 第一位不能为小数点
    if (!value || value === '.') {
      (e.target as any).value = ''
      return
    }

    if (vals) {
      for (let i in vals) {
        if (isNaN(Number(vals[i]))) {
          console.error('value 的下标 ', i, '不能转换为数组')
          return
        }
      }
      value = value < vals[0] ? vals[0] : value > vals[1] ? vals[1] : value
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
  app.directive('num', (el, binding) => {
    // console.log(binding);

    if (binding.arg && ['number', 'float'].indexOf(binding.arg) === -1) {
      console.error('传递给指令的参数只能为 number,float')
      return
    }

    if (binding.value instanceof Array && binding.value.length !== 2) {
      console.error('传递给指令的 value 值长度不为 2 ')
      console.error('value：', binding.value)
      return
    }
    // 获取input标签元素。el.children[0]兼容el-input
    inputNode = el.tagName === 'INPUT' ? el : el.children[0]

    // value 为一个数组 [min,max]。input的值不能大于max 并且不能小于 min。可以说是input值必须在min和max之间（或者为min和max）
    float(binding.arg, binding.modifiers, binding.value)
  })
}