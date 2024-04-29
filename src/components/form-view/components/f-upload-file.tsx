/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-24 14:20:56
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-11-24 14:46:00
 * @Description:
 */
import UploadFile from '../../com-upload-file.vue'
import { componentProps, isProperty, useEvent } from '../form-view-data'
import type { FormTypeEnum } from '../form-view-data'

export const FUploadFile = defineComponent({
  name: 'FUploadFile',
  props: componentProps<FormTypeEnum.UploadFile>(),
  setup(props) {
    const { event } = useEvent<FormTypeEnum.UploadFile>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })
    return () => (
      <>
        <UploadFile
          style={props.formItem.data?.style || {}}
          onUploadFileSuccess={(...arg: any) => {
            event('upload-file-success', ...arg)
          }}
          onUploadFileDelete={(...arg: any) => {
            event('upload-file-delete', ...arg)
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
