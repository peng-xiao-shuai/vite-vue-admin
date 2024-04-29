/*
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-24 14:20:56
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-05 18:25:36
 * @Description:
 */
import UploadMedia from '../../com-upload-media.vue'
import { componentProps, isProperty, useEvent } from '../form-view-data'
import type { FormTypeEnum } from '../form-view-data'

export const FUploadMedia = defineComponent({
  name: 'FUploadMedia',
  props: componentProps<FormTypeEnum.UploadMedia>(),
  setup(props) {
    const { event } = useEvent<FormTypeEnum.UploadMedia>({
      formData: props.formData,
      index: props.index!,
      formItem: props.formItem,
    })
    return () => (
      <>
        <UploadMedia
          style={props.formItem.data?.style || {}}
          onFilesChange={(...arg: any) => {
            event('files-change', ...arg)
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
