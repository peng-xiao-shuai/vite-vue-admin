/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-21 19:06:08
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:23:40
 * @Description:
 */
import { ElInput } from 'element-plus'
import {
  FormTypeEnum,
  componentProps,
  isProperty,
  useEvent,
} from '../form-view-data'
import { clearSymbol } from '../utils'

export const FInput = defineComponent({
  name: 'FInput',
  props: componentProps<FormTypeEnum.Input>(),
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { event } = useEvent<FormTypeEnum.Input>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })

    /**
     * 不要直接使用 v-model props.formData[props.formItem.prop!] 避免页面卡顿
     */
    const modelValue = ref(props.formData[props.formItem.prop!])
    const stop = watchEffect(() => {
      modelValue.value = props.formData[props.formItem.prop!]
    })

    onUnmounted(() => {
      stop()
    })

    return () => (
      <>
        <ElInput
          v-slots={{
            [props.formItem.data?.slot as string]: () => (
              <span style={{ padding: '0 10px' }}>
                {props.formItem.data?.symbol}
              </span>
            ),
          }}
          style={props.formItem.data?.style || {}}
          placeholder={`请输入${clearSymbol(props.formItem.text)}`}
          v-model={modelValue.value}
          onBlur={(...arg: any) => event('blur', ...arg)}
          onFocus={(...arg: any) => event('focus', ...arg)}
          onChange={(v: string) => {
            emit('update:modelValue', v)
            event('change', v)
          }}
          onInput={(...arg: any) => event('input', ...arg)}
          onClear={(...arg: any) => event('clear', ...arg)}
          {...{
            rows: 3,
            clearable: true,
            type: props.formItem.type || FormTypeEnum.Input,
            ...isProperty(
              {
                formData: props.formData,
                index: props.index!,
                formItem: props.formItem,
              },
              props.formItem.data?.property,
            ),
          }}
        ></ElInput>
      </>
    )
  },
})

export default FInput
