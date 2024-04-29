<!--
 * @Author: peng-xiao-shuai
 * @Date: 2023-11-17 15:18:34
 * @LastEditors: peng-xiao-shuai
 * @LastEditTime: 2023-12-04 19:57:12
 * @Description:
-->
<template>
  <el-button
    :loading="loadings.allLoading"
    type="primary"
    @click="exportExcel()"
  >
    <slot>导出全部</slot>
  </el-button>
  <el-button
    v-if="isSelectExport"
    :loading="loadings.allLoading"
    type="default"
    @click="exportExcel('select')"
  >
    <slot name="select-export">导出选中</slot>
  </el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus/es'
import type {
  PowerfulTableExpose,
  PowerfulTableHeaderProps,
} from 'el-plus-powerful-table-ts'
import { useGetRefs } from '@/hooks/useGetRefs'
import * as xlsx from 'xlsx'

/**
 * 导出 excel
 * @param {object[]} data 数据
 * @param {string} tableName 文件名称
 * @example
 * exportExcelApi([{id: 1, 昵称: 'peng-xiao-shuai'}], '文件名称')
 */
function exportExcelApi(data: any[], tableName: string) {
  const resultWs = xlsx.utils.json_to_sheet(data)
  const wb = xlsx.utils.book_new()

  xlsx.utils.book_append_sheet(wb, resultWs, '-')
  xlsx.writeFile(wb, `${tableName}.xlsx`)
}

type Row = any

const componentProps = defineProps({
  title: String as PropType<string>,
  refName: String as PropType<string>,
  beforeExport: Function as PropType<(list: Row) => void>,
})
// 获取实例
const PTableExpose = useGetRefs<PowerfulTableExpose>(
  componentProps.refName || 'PTable',
)
const isSelectExport = ref(false)
const route = useRoute()

onMounted(() => {
  nextTick(() => {
    isSelectExport.value = !!PTableExpose.value?.props.isSelect
  })
})

/**
 * 按钮 loading
 */
const loadings = reactive({
  allLoading: false,
  selectLoading: false,
})

/**
 * @description: 单元格具体内容
 * @param { PowerfulTableHeaderProps<Row> } props
 * @param { Row } row
 * @param { number } index
 * @return {string|number}
 */
const cellContent = (
  props: PowerfulTableHeaderProps<Row>,
  row: Row,
  index: number,
): string | number => {
  const renderData = props.render?.(h, row, index)

  if (
    renderData &&
    (typeof renderData === 'string' || typeof renderData === 'number')
  ) {
    return renderData
  }

  if (typeof props.data?.formatting === 'function') {
    return props.data.formatting?.({ row, index, props })
  }

  if (typeof props.filters === 'function') {
    return props.filters?.(row, index)
  }

  if (Array.isArray(props.filters)) {
    const current = props.filters.find((item) => item.key == row[props.prop])
    return current ? current.value : row[props.prop]
  }

  return row[props.prop]
}

/**
 * 获取导出的数据结构
 */
const exportData = (row: Row) => {
  const data: { [s: string]: any } = {}

  PTableExpose.value?.headerLists.forEach((item, index) => {
    // 先判断 props 长度 和 数据类型，如果是对象或者数组长度为1时则取 text 或 label (优先级 text > label)
    if (item.label) {
      if (!Array.isArray(item.props) && item.props.prop) {
        data[item.props.text || item.label] = (row: Row) =>
          cellContent(item.props as PowerfulTableHeaderProps<Row>, row, index)
        return
        // 对象类型
      }

      ;(item.props as PowerfulTableHeaderProps<Row>[]).forEach((prop) => {
        if (prop.prop) {
          data[prop.text || item.label] = (row: Row) =>
            cellContent(prop, row, index)
        }
      })
    }
  })

  Object.keys(data).forEach((key) => {
    data[key] = data[key](row)
  })

  return data
}

/**
 * @description 解析对象获取深层次值
 * @param {object} data
 * @param {string} key
 * @example
 * resolution({a: {b: {c: 1}}}, 'a.b.c') // 1
 */
const resolution = (data: object, key: string) => {
  const keys = key.split('.')
  let rtn: { [s: string]: any } = data
  keys.forEach((key) => {
    rtn = rtn[key]
  })

  return rtn
}

/**
 * 导出表格
 * @param {'select'|'all'} type select 导出部分 all 导出全部
 */
const exportExcel = (type: 'select' | 'all' = 'all') => {
  if (type === 'all') {
    loadings.allLoading = true
    const injectProps = PTableExpose.value?.injectProps
    const props = PTableExpose.value?.props
    if (typeof props?.listRequest?.listApi === 'function') {
      // 获取 key 值
      const [pageNoKey, pageSizeKey, responseKey, listsKey] = [
        props.listRequest?.pageNoKey ||
          injectProps?.listRequest?.pageNoKey ||
          'pageNo',
        props.listRequest?.pageSizeKey ||
          injectProps?.listRequest?.pageSizeKey ||
          'pageSize',
        props.listRequest?.responseKey ||
          injectProps?.listRequest?.responseKey ||
          'data.result',
        props.listRequest?.listsKey ||
          injectProps?.listRequest?.listsKey ||
          'rows',
      ]

      props.listRequest
        ?.listApi({
          ...(props.listRequest.listQuery || {}),
          [pageNoKey]: 1,
          /**
           * 这里更具接口支持的查询全部时的条数，部分接口为 0 时查全部
           */
          [pageSizeKey]: 10,
        })
        .then((res: any) => {
          const response = resolution(res, responseKey)
          response[listsKey]

          const list = response[listsKey].map((row: Row) => exportData(row))

          if (!list?.length) {
            ElMessage.error('请先选择导出的数据！')
            loadings.allLoading = false
            return
          }
          exportExcelApi(list, componentProps.title || route.meta.title || '')
          loadings.allLoading = false
        })
    } else {
      if (componentProps.beforeExport) {
        componentProps.beforeExport((Rows: Row[]) => {
          if (!Rows.length) {
            ElMessage.error('请先选择导出的数据！')
            loadings.allLoading = false
            return
          }

          const list = Rows.map((row: Row) => exportData(row))
          exportExcelApi(list, componentProps.title || route.meta.title || '')
          loadings.allLoading = false
        })
      } else {
        console.error(
          'PowerfulTable 组件上为传递 listApi 时， Props beforeExport 不能为空',
        )
        loadings.allLoading = false
      }
    }
  } else {
    const powerfulTableData = PTableExpose.value?.powerfulTableData
    const selectData = [
      ...(powerfulTableData?.currentSelect || []),
      ...(powerfulTableData?.otherSelect || []),
    ]
    if (!selectData.length) {
      ElMessage.error('请先选中数据！')
      loadings.selectLoading = true
      return
    }
    loadings.selectLoading = true

    const list = selectData.map((row: Row) => exportData(row))
    exportExcelApi(list, componentProps.title || route.meta.title || '')
    loadings.selectLoading = false
  }
}
</script>
