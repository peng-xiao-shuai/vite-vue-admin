/*
 * @Author: peng-xiao-shuai
 * @Date: 2021-10-02 10:07:27
 * @Last Modified by: peng-xiao-shuai
 * @Last Modified time: 2023-02-27 15:59:57
 */

import { ElMessage } from 'element-plus'
import type { App } from 'vue'

/**
 * @param {string|[string,Function]} bind.value 值
 */

let val: string

export default function copy(app: App) {
  app.directive('copy', {
    mounted(el, bind) {
      if (
        !(bind.value instanceof Array) &&
        typeof bind.value != 'string' &&
        typeof bind.value != 'number'
      ) {
        throw new Error(`value 类型错误，只能为 String、Array 以及 Number`)
      }

      val = bind.value instanceof Array ? bind.value[0] : bind.value

      el.style.cursor = 'pointer'
      el.addEventListener('click', () => {
        // 获取需要复制的值
        const callback =
          Array.isArray(bind.value) && bind.value.length > 1
            ? bind.value[1]
            : () => ElMessage.success('复制成功！')

        if (!val) {
          throw new Error(`value 不能为空`)
        }

        // 兼容低版本不存在 navigator.clipboard 情况
        if (navigator.clipboard && navigator.permissions) {
          navigator.clipboard
            .writeText(val)
            .then(() => {
              callback()
            })
            .catch((err) => {
              console.error('Unable to copy text to clipboard', err)
            })
        } else {
          // 创建dom
          const input = document.createElement('input')
          input.setAttribute('value', val)
          input.style.position = 'fixed'
          input.style.left = '999px'
          input.style.top = '10px'
          // 选中文本
          document.body.appendChild(input)
          input.select()
          document.execCommand('copy')
          //  删除dom
          document.body.removeChild(input)

          callback()
        }
      })
    },
    updated(el, bind) {
      if (!(bind.value instanceof Array) && typeof bind.value != 'string') {
        throw new Error(`value 类型错误，只能为 String 或者 Array`)
      }

      val = bind.value instanceof Array ? bind.value[0] : bind.value
    },
  })
}
