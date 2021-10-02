/*
 * @Author: 彭小黑 
 * @Date: 2021-10-02 10:07:27 
 * @Last Modified by: 彭小黑
 * @Last Modified time: 2021-10-02 17:13:16
 */

import { ElMessage } from 'element-plus';
import type { App } from 'vue';

/**
 * @param {string|[string,Function]} bind.value 值
 */

let val: string

export default function copy(app: App) {
  app.directive('copy', {
    mounted(el, bind) {
      if (!(bind.value instanceof Array) && typeof bind.value != 'string' && typeof bind.value != 'number') {
        throw new Error(`value 类型错误，只能为 String、Array 以及 Number`)
      }
  
      val = bind.value instanceof Array ? bind.value[0] : bind.value

      el.style.cursor = 'pointer'
      el.addEventListener('click',() => {
        // 获取需要复制的值
        const callback = Array.isArray(bind.value) && bind.value.length > 1 ? bind.value[1] : () => ElMessage.success('复制成功！')
  
        if (!val) {
          throw new Error(`value 不能为空`)
        }

        // 创建dom
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', val);
        // 选中文本
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          console.log(bind);
          
          callback()
         }
        //  删除dom
         document.body.removeChild(input);
      })
    },
    updated(el, bind) {
      if (!(bind.value instanceof Array) && typeof bind.value != 'string') {
        throw new Error(`value 类型错误，只能为 String 或者 Array`)
      }

      val = bind.value instanceof Array ? bind.value[0] : bind.value
    }
  })
}