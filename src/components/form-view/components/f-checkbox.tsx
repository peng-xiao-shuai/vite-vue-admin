/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 10:59:02
 * @Description:
 */
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import 'element-plus/theme-chalk/src/checkbox-group.scss'
import 'element-plus/theme-chalk/src/checkbox.scss'
import { componentProps, isProperty, useEvent } from '../form-view-data'
import { isBolOrFun } from '../utils'
import type { FormTypeEnum } from '../form-view-data'

export const FCheckbox = defineComponent({
  name: 'FCheckbox',
  props: componentProps<FormTypeEnum.Checkbox>(),
  setup(props) {
    const { event } = useEvent<FormTypeEnum.Checkbox>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElCheckboxGroup
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
          {props.formItem.data?.options.map((checkbox) => (
            <ElCheckbox
              label={checkbox.label}
              disabled={isBolOrFun(checkbox.disabled, {
                formData: props.formData,
                formItem: props.formItem,
                index: props.index!,
              })}
              border={checkbox.border}
              name={checkbox.name}
            >
              {checkbox.text || checkbox.label}
            </ElCheckbox>
          ))}
        </ElCheckboxGroup>
      </>
    )
  },
})

export default FCheckbox
