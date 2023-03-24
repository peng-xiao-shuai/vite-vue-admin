import { ref, markRaw, reactive } from 'vue'
import { setData } from 'el-plus-powerful-table-ts/es'
import type { PowerfulTableHeader } from 'el-plus-powerful-table-ts'
import { View, Edit, Remove } from '@element-plus/icons-vue'

export type RowType = {
  hidden: number
  icon?: string
  id: number
  level: number
  name: string
  parentId: number
  sort?: number
  title: string
}

interface PowerfulTableData {
  listQuery: Query
  total: number
  list: RowType[]
  menusArr?: [{ id: 0; title: '无上级菜单' }]
}

interface Query {
  pageNum: number
  pageSize: number
  [propName: string]: string | number
}

export const defaultData = {
  hidden: 1,
  icon: '',
  id: 0,
  level: 0,
  name: '',
  parentId: 0,
  sort: 0,
  title: '',
}

export const useData = <Row = any>() => {
  const header: PowerfulTableHeader<Row>[] = [
    {
      label: '编号', //显示的标题
      minWidth: '80', //对应列的最小宽度
      sortable: true, //排序
      props: [
        {
          prop: 'id',
        },
      ],
    },
    {
      label: '菜单名称', //显示的名称
      overflowTooltip: true,
      props: [
        {
          prop: 'title',
        },
      ],
    },
    {
      label: '菜单级数', //显示的名称
      props: [
        {
          prop: 'level',
          filters: [
            { key: 0, value: '一级' },
            { key: 1, value: '二级' },
            { key: 2, value: '三级' },
          ],
        },
      ],
    },
    {
      label: '前端名称', //显示的名称
      props: [
        {
          prop: 'name',
        },
      ],
    },
    {
      label: '前端图标', //显示的名称
      props: [
        {
          type: 'iconfont',
          prop: 'icon',
          data: {
            style: { fontSize: '24px' },
            class: ['viteIcon'],
          },
        },
      ],
    },
    {
      label: '是否显示', //显示的名称
      props: [
        {
          prop: 'hidden',
          type: 'switch',
          data: setData<'switch'>({
            property: {
              activeValue: 1,
              inactiveValue: 0,
              inactiveText: '隐',
              activeText: '显',
            },
          }),
        },
      ],
    },
    {
      label: '排序', //显示的标题
      sortable: true, //排序
      props: [
        {
          prop: 'sort',
        },
      ],
    },
    {
      label: '操作', //显示的标题
      minWidth: '180px',
      props: [
        {
          type: 'btn',
          prop: '',
          data: setData<'btn'>([
            {
              text: '查看下级',
              params: 'query',
              property: {
                type: 'primary',
                icon: markRaw(View),
              },
            },
            {
              text: '编辑',
              params: 'update',
              property: {
                type: 'info',
                icon: markRaw(Edit),
              },
            },
            {
              text: '删除',
              params: 'remove',
              property: {
                type: 'danger',
                icon: markRaw(Remove),
              },
            },
          ]),
        },
      ],
    },
  ]

  const powerfulTableData: PowerfulTableData = reactive({
    listQuery: {
      pageNum: 1,
      pageSize: 10,
    },
    total: 0,
    list: [],
  })

  // 编辑区当前数据
  const currentForm: RowType = reactive({ ...defaultData })

  const parentId = ref(0)
  // 存储上级信息
  const upParent = ref<RowType[]>([])
  // 渲染的菜单
  const allList = ref<{ id: number | string; title: string }[]>([])

  // 编辑区显隐
  const isDialog = ref(false)

  return {
    header,
    powerfulTableData,
    currentForm,
    parentId,
    upParent,
    allList,
    isDialog,
  }
}
