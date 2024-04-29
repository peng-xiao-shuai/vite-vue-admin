import { deepClone } from 'el-plus-powerful-table-ts/es'
import { ElMessage, type FormInstance, type FormItemRule } from 'element-plus'
import { clearSymbol, isTypeProtect, verifyFormItemRule } from './utils'
import type {
  PowerfulTableExpose,
  PowerfulTableHeader,
} from 'el-plus-powerful-table-ts'
import type {
  FormEventType,
  FormItem,
  FormListApi,
  FormType,
  FormViewData,
  FormViewPTHeaders,
  FormViewProps,
  PTHeadersProps,
  SetDataType,
} from './form-view'
import { useAsyncGetRefs, useGetRefs } from '@/hooks/useGetRefs'

export enum FormTypeEnum {
  Select = 'select',
  Input = 'input',
  Switch = 'switch',
  Rate = 'rate',
  Slot = 'slot',
  Textarea = 'textarea',
  DatePicker = 'datePicker',
  UploadFile = 'uploadFile',
  Radio = 'radio',
  Checkbox = 'checkbox',
  UploadMedia = 'uploadMedia',
}

/**
 * 定义初始数据对象，用于重置表单
 */
const DEFAULT_DATA: { [s: string]: any } = {}

/**
 * form-view 组件 props
 */
export const formViewProps = {
  // 表单配置数据
  formItems: {
    type: Array as PropType<FormViewProps['formItems']>,
    default: () => [],
  },
  extendTable: {
    type: [Boolean, String] as PropType<FormViewProps['extendTable']>,
    default: false,
  },

  formDataDefault: {
    type: Object as PropType<FormViewProps['formDataDefault']>,
    default: () => ({}),
  },
  disabled: {
    type: Boolean as PropType<FormViewProps['disabled']>,
    default: false,
  },
  showType: {
    type: String as PropType<FormViewProps['showType']>,
    default: undefined,
  },
  property: {
    type: Object as PropType<FormViewProps['property']>,
    default: () => ({}),
  },

  apis: {
    type: [Object, Function] as PropType<FormViewProps['apis']>,
    default: undefined,
  },

  showLabel: {
    type: Boolean as PropType<FormViewProps['showLabel']>,
    default: true,
  },
}

/**
 * components Props
 */
export const componentProps = <T extends keyof FormType>() => ({
  // 按钮组件配置数据
  formItem: {
    type: Object as PropType<FormItem<T>>,
    default: () => ({}),
  },

  formData: {
    type: Object as PropType<FormViewData['formData']>,
    default: () => ({}),
  },
  index: {
    type: Number as PropType<number>,
  },
})

// 对部分支持函数的 property 参数进行判断返回
export const isProperty = <T, R>(e: T, property?: R | ((e: T) => R)) => {
  return isTypeProtect<typeof property, R>(
    property,
    (pet) => typeof (<R>pet) != 'function',
  )
    ? property
    : property!(e)
}

/**
 * form-view 组件 数据
 */
export const useFormViewState = (props: FormViewProps) => {
  const proxy = getCurrentInstance()?.proxy

  const formViewData: FormViewData = reactive({
    formItems: [],
    rules: {},
    formData: {},
    watchCache: [],
  })
  const elFormRef = ref<FormInstance | null>(null)

  /**
   * @description 写入 formItems 数据，在基于 formItems 数据写入 rules、formData
   * @param {PowerfulTableHeader} PTHeader 表格header数据
   * @param {PTHeadersProps} PTHeaderProps props 数据，基于表格 props 进行补充了部分属性
   */
  const setFormItems = (
    PTHeader: PowerfulTableHeader,
    PTHeaderProps: PTHeadersProps,
  ) => {
    /**
     * 判断 PTHeaderProps.type 类型是否可以表单组件接受, 可以接受那么这个值就在 FormType 中存在
     */
    const typeComparison = Object.values(FormTypeEnum).includes(
      PTHeaderProps.type as any, // 这里由于是继承了列表的type,但是表单也有type不好去断言，故此直接使用了 any
    )

    // 深拷贝数据
    const formItem = deepClone<FormItem>({
      text: PTHeaderProps.text || PTHeader.label,
      prop: PTHeaderProps.formItem?.prop || PTHeaderProps.prop,
      render: typeComparison ? PTHeaderProps.render : undefined,
      type: typeComparison ? (PTHeaderProps.type as keyof FormType) : undefined,
      slotName: PTHeaderProps.slotName,

      ...(PTHeaderProps.formItem || {}),

      data:
        typeComparison && !PTHeaderProps.formItem?.data
          ? PTHeaderProps.data || {}
          : {
              ...(typeComparison ? PTHeaderProps.data : {}),
              ...PTHeaderProps.formItem?.data,
            },
    })

    // 写入 formItems 对 el-form-item 循环
    formViewData.formItems.push(formItem)

    // 写入相应类型其他默认值
    setDefaultData(
      formItem as Required<FormItem>,
      formViewData.formData,
      PTHeaderProps,
    )

    // 写入 rules (表单校验)
    setRules(formItem as Required<FormItem>)
  }

  /**
   * @description 写入 rules 数据
   * @param {FormItem} formItem
   */
  const setRules = (formItem: FormItem) => {
    // 如果 formItem.rule 直接是 FormItemRule[] 类型，则 return
    if (
      formItem.rule &&
      isTypeProtect<typeof formItem.rule, FormItemRule[]>(
        formItem.rule,
        (rule) =>
          Array.isArray(rule) &&
          typeof rule[0] === 'object' &&
          !Array.isArray(rule[0]),
      )
    ) {
      formViewData.rules[formItem.prop] = formItem.rule
      return
    }

    const rules = []

    // 判断是否存在
    if (formItem.rule) {
      rules.push({
        required: true,
        message: `${clearSymbol(formItem.text)}不能为空`,
        trigger: 'blur',
      })

      // rule 长度限制
      if (Array.isArray(formItem.rule)) {
        rules.push({
          min: formItem.rule[0],
          max: formItem.rule[1],
          message: `字符限制为 ${formItem.rule[0]} ~ ${formItem.rule[1]}`,
          trigger: 'blur',
        })
      } else if (
        typeof formItem.rule === 'string' &&
        verifyFormItemRule[formItem.rule]
      ) {
        rules.push(verifyFormItemRule[formItem.rule])
      }

      formViewData.rules[formItem.prop] = rules
    }
  }

  /**
   * @description 更具类型写入数据
   * @param {FormItem} formItem
   * @param {FormViewData['formData']} formData
   * @param {PTHeadersProps} formItem
   */
  const setDefaultData = (
    formItem: FormItem,
    formData: FormViewData['formData'],
    PTHeaderProps?: PTHeadersProps,
  ) => {
    // 写入 formData （表单数据）
    Object.assign(formViewData.formData, props.formDataDefault || {})

    formViewData.formData[formItem.prop!] =
      props.formDataDefault?.[formItem.prop!] || formItem.defaultData || ''
    DEFAULT_DATA[formItem.prop!] = formItem.defaultData || ''

    switch (formItem.type) {
      case FormTypeEnum.Select:
        // 给select类型添加默认值
        if (PTHeaderProps) {
          if (!formItem.data?.options && Array.isArray(PTHeaderProps.filters)) {
            ;(formItem as FormItem<FormTypeEnum.Select>).data!.options =
              PTHeaderProps.filters.map((f) => ({
                label: f.value,
                value: f.key,
              }))
          }
        }
        /**
         * 这是解决 select-v2 上 value = '' 时不会显示 placeholder
         */
        formData[formItem.prop] = formData[formItem.prop] || undefined
        DEFAULT_DATA[formItem.prop!] = formItem.defaultData || ''

        break
      case FormTypeEnum.Rate:
        formData[formItem.prop] = Number.isNaN(Number(formData[formItem.prop]))
          ? 0
          : Number(formData[formItem.prop])
        break
      case FormTypeEnum.Checkbox: {
        const array = Array.isArray(formData[formItem.prop])
          ? formData[formItem.prop]
          : []
        /**
         * 由于是使用 checkboxGroup 实现，checkboxGroup v-model 接受数组形式，故此在此格式化数据
         */
        formData[formItem.prop] =
          typeof formData[formItem.prop] === 'string'
            ? formData[formItem.prop].split(',').filter((v: string) => v.length)
            : array

        DEFAULT_DATA[formItem.prop!] = formItem.defaultData || []
        break
      }
    }
  }

  /**
   * 转换数据
   * @param { FormViewPTHeaders[] } headerLists
   */
  const transformHeader = (headerLists: FormViewPTHeaders[]) => {
    /**
     * 清除数据
     */
    formViewData.formItems = []
    Object.keys(DEFAULT_DATA).forEach((k) => delete DEFAULT_DATA[k])

    headerLists.forEach((item) => {
      // item.props 是肯定存在的
      if (Array.isArray(item.props)) {
        // 过滤 prop 下不存在 formItem
        item.props
          .filter((prop) => prop.formItem)
          .forEach((prop: PTHeadersProps) => {
            setFormItems(item, prop)
          })
      } else {
        if (item.props.formItem) setFormItems(item, item.props)
      }
    })
  }

  /**
   * @description 打平 PowerfulTable 组件 header。修改初始数据
   */
  formViewData.watchCache.push(
    ...[
      /**
       * 监听 extendTable 数据变化
       */
      watch(
        () => props.extendTable,
        (val) => {
          if (val) {
            let headerLists = []
            useAsyncGetRefs<PowerfulTableExpose>(
              typeof val === 'boolean' ? 'PTable' : val,
              proxy!,
            ).then((res) => {
              headerLists = res?.headerLists as FormViewPTHeaders[]

              transformHeader(headerLists)
            })
          }
        },
        {
          immediate: true,
        },
      ),
      watch(
        () => props.formDataDefault,
        (val) => {
          formViewData.formData = deepClone(DEFAULT_DATA)
          // 写入 formData （表单数据）
          Object.assign(formViewData.formData, val || {})
        },
        {
          immediate: true,
          deep: true,
        },
      ),
      watch(
        () => props.formItems,
        (val) => {
          if (val && props.extendTable === false) {
            /**
             * 清除数据
             */
            formViewData.formItems = val
            Object.keys(DEFAULT_DATA).forEach((k) => delete DEFAULT_DATA[k])

            formViewData.formItems.forEach((item) => {
              setRules(item)

              setDefaultData(item, formViewData.formData)
            })
          }
        },
        {
          immediate: true,
          deep: true,
        },
      ),
    ],
  )

  /**
   * 更具显示类型过滤
   */
  const formRenderItems = computed(() =>
    formViewData.formItems.filter(
      (item) =>
        (Array.isArray(item.showType)
          ? item.showType.includes(props.showType || '')
          : item.showType === props.showType) ||
        !props.showType ||
        !item.showType,
    ),
  )

  onBeforeUnmount(() => {
    // 清除监听事件
    formViewData.watchCache.forEach((item) => item())
  })

  return {
    formViewData,
    formRenderItems,
    elFormRef,
    transformHeader,
  }
}

export const useFunction = (
  props: FormViewProps,
  formData: FormViewData['formData'],
  elFormRef: Ref<FormInstance | null>,
  transformHeader: (headerLists: FormViewPTHeaders[]) => void,
) => {
  /**
   * @param {object} [params = {}] apis 请求的格外参数
   */
  const submitForm = (params: object = {}) => {
    elFormRef
      .value!.validate()
      .then(() => {
        if (props.apis) {
          // 是否存在 apis
          // 自定义类型保护判断
          if (
            isTypeProtect<typeof props.apis, { [key: string]: FormListApi }>(
              props.apis,
              (apis) => !!Object.keys(apis!).length,
            )
          ) {
            // 通过自定义类型保护后，在判断 props.showType 是否存在，props.showType 作为 apis 键值，props.showType 不存在就报错
            if (props.showType) {
              if (props.apis?.[props.showType]) {
                props.apis?.[props.showType]({
                  ...params,
                  ...formData.value,
                })
                  .then(() => {
                    ElMessage.success('提交成功！')
                  })
                  .catch(() => {
                    ElMessage.error('提交失败！')
                  })
              } else console.error(`apis.${props.showType} 不存在`)
            } else
              console.error(
                `showType 为空，但是 apis 为对象时需要 showType 作为键值。或者 apis 传递一个 Promise`,
              )
          } else {
            props
              .apis?.({ ...params, ...formData.value })
              .then(() => {
                ElMessage.success('提交成功！')
              })
              .catch(() => {
                ElMessage.error('提交失败！')
              })
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })

    return elFormRef.value!.validate()
  }

  const resetForm = () => {
    formData.value = deepClone(DEFAULT_DATA)
  }

  /**
   * 刷新从表格继承数据
   * @param {string} [refName = 'PTable'] PowerfulTable 组件 refName
   */
  const refreshRender = (
    refName: string = typeof props.extendTable === 'boolean'
      ? 'PTable'
      : props.extendTable!,
    proxy = getCurrentInstance()?.proxy,
  ) => {
    const PTExpose = useGetRefs<PowerfulTableExpose>(refName, proxy!)

    const stop = watch(
      () => PTExpose.value,
      (val) => {
        transformHeader(val!.headerLists)
        stop()
      },
    )
  }

  return {
    submitForm,
    resetForm,
    refreshRender,
    bindAttr<T extends keyof FormType>(
      formItem: FormItem<T>,
      formData: FormViewData['formData'],
      index: number,
    ): {
      formItem: FormItem<T>
      formData: FormViewData['formData']
      index: number
    } {
      return {
        formItem,
        formData,
        index,
      }
    },
  }
}

/**
 * 对 components文件夹下组件内部事件处理
 * @param {{ formData: FormViewData['formData']; index: number; formItem: FormItem<T> }} props 事件携带的一个参数数据
 */
export const useEvent = <T extends FormEventType>(props: {
  formData: FormViewData['formData']
  formItem: FormItem<T>
  index: number
}) => {
  const event = (
    eventType: keyof NonNullable<SetDataType<T>['on']>,
    ...arg: any
  ) => {
    if (
      isTypeProtect<SetDataType<FormEventType>, SetDataType<FormEventType>>(
        props.formItem.data!,
        (data) => typeof data?.on != undefined,
      )
    ) {
      ;(props.formItem.data?.on as { [key: string]: any })?.[
        eventType as string
      ]?.({ ...props }, ...arg)
    }
  }

  return {
    event,
  }
}
