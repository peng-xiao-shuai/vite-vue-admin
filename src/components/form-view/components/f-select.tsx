/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-23 11:46:38
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-19 11:10:54
 * @Description:
 */
import { ElSelectV2 } from 'element-plus'
import 'element-plus/theme-chalk/src/select-v2.scss'

import { componentProps, isProperty, useEvent } from '../form-view-data'
import { clearSymbol } from '../utils'
import type { FormTypeEnum } from '../form-view-data'

export const FSelect = defineComponent({
  name: 'FSelect',
  props: componentProps<FormTypeEnum.Select>(),
  setup(props) {
    const { event } = useEvent<FormTypeEnum.Select>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElSelectV2
          v-model={props.formData[props.formItem.prop!]}
          style={props.formItem.data?.style || { width: '100%' }}
          options={props.formItem.data?.options || []}
          onChange={(...arg: any) => {
            event('change', ...arg)
          }}
          placeholder={`请选择${clearSymbol(props.formItem.text)}`}
          v-slots={{
            default: () =>
              props.formItem.data?.slots?.default?.(
                h,
                props.formData,
                props.index!,
              ),
            empty: () =>
              props.formItem.data?.slots?.empty?.(
                h,
                props.formData,
                props.index!,
              ),
            prefix: () =>
              props.formItem.data?.slots?.prefix?.(
                h,
                props.formData,
                props.index!,
              ),
          }}
          clearable
          {...isProperty(
            {
              formData: props.formData,
              index: props.index!,
              formItem: props.formItem,
            },
            props.formItem.data?.property,
          )}
        />
      </>
    )
  },
})

export default FSelect
