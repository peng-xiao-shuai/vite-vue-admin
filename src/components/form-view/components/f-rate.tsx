/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-12 22:41:45
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:25:00
 * @Description:
 */
import { ElRate } from 'element-plus'
import { componentProps, isProperty, useEvent } from '../form-view-data'
import type { FormTypeEnum } from '../form-view-data'

export const FRate = defineComponent({
  name: 'FRate',
  props: componentProps<FormTypeEnum.Rate>(),
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { event } = useEvent<FormTypeEnum.Rate>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    return () => (
      <>
        <ElRate
          v-model={props.formData[props.formItem.prop!]}
          style={props.formItem.data?.style || {}}
          onChange={(arg: number) => {
            emit('update:modelValue', arg)
            event('change', arg)
            setTimeout(() => {
              console.log(props.formData[props.formItem.prop!], arg)
            }, 1000)
          }}
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

export default FRate
