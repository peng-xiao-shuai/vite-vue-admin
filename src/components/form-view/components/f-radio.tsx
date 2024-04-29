/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 10:55:22
 * @Description:
 */
import { ElRadio, ElRadioGroup } from 'element-plus'
import 'element-plus/theme-chalk/src/radio-group.scss'
import 'element-plus/theme-chalk/src/radio.scss'
import { componentProps, isProperty, useEvent } from '../form-view-data'
import { isBolOrFun } from '../utils'
import type { FormTypeEnum } from '../form-view-data'

export const FRadio = defineComponent({
  name: 'FRadio',
  props: componentProps<FormTypeEnum.Radio>(),
  setup(props) {
    const { event } = useEvent<FormTypeEnum.Radio>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElRadioGroup
          v-model={props.formData[props.formItem.prop!]}
          style={props.formItem.data?.style || {}}
          onChange={(...arg: any) => event('change', ...arg)}
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            props.formItem.data?.property,
          )}
        >
          {props.formItem.data?.options.map((radio) => (
            <ElRadio
              label={radio.label}
              disabled={isBolOrFun(radio.disabled, {
                formData: props.formData,
                formItem: props.formItem,
                index: props.index!,
              })}
              border={radio.border}
              name={radio.name}
            >
              {radio.text || radio.label}
            </ElRadio>
          ))}
        </ElRadioGroup>
      </>
    )
  },
})

export default FRadio
