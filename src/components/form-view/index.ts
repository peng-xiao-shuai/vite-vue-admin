/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-22 14:24:32
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 14:34:18
 * @Description:
 */
import {
  FCheckbox,
  FDatePicker,
  FInput,
  FRadio,
  FRate,
  FSelect,
  FSwitch,
  FUploadFile,
  FUploadMedia,
} from './components'
import FormView from './form-view.vue'
import type { FormType } from './form-view'
import type { App } from 'vue'

// 不同类型的data数据类型提示
export const formViewSetData = <T extends keyof FormType>(
  data: FormType[T],
): FormType[T] => data

export const componentRegister = (app: App) => {
  ;[
    FInput,
    FSwitch,
    FRate,
    FSelect,
    FDatePicker,
    FRadio,
    FCheckbox,
    FUploadFile,
    FUploadMedia,
    FormView,
  ].forEach((c) => {
    app.component(c.name, c)
  })
}
