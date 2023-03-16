import store from '@/store'
import { ref, markRaw, reactive } from 'vue'
import { setData } from 'el-plus-powerful-table-ts/es'
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
} from 'el-plus-powerful-table-ts'
import { Edit, Remove } from '@element-plus/icons'
interface PowerfulTableData {
  listQuery: Query
  total: number
  list: any[]
}

interface Query {
  pageNum: number
  pageSize: number
  types: string
  name: string
  [propName: string]: string | number
}
export const useData = <Row = any>() => {
  const header: PowerfulTableHeader<Row>[] = [
    {
      label: '编号', //显示的标题
      minWidth: '60', //对应列的最小宽度
      sortable: true, //排序
      props: [
        {
          prop: 'id',
        },
      ],
    },
    {
      label: '书名', //显示的名称
      props: [
        {
          type: 'href',
          prop: 'href',
          data: {
            prop: 'name',
            style: { fontWeight: 'bold' },
          },
        },
        {
          text: '热度：',
          type: 'iconfont',
          prop: 'iconfont',
          data: setData<'iconfont'>({
            style: { color: 'red' },
          }),
        },
      ],
    },
    {
      label: '封面', //显示的名称
      width: '120',
      props: [
        {
          type: 'image',
          prop: 'image',
          data: setData<'image'>({
            style: { width: '40px', height: '60px', borderRadius: '5px' },
            property: {},
          }),
        },
      ],
    },
    {
      label: '类型', //显示的名称
      width: '100',
      props: [
        {
          prop: 'types',
          filters: [
            { key: 0, value: '玄幻' },
            { key: 1, value: '都市' },
            { key: 2, value: '真实' },
          ],
        },
      ],
    },
    {
      label: '内容', //显示的名称
      // overflowTooltip: true,
      width: '150',
      props: [
        {
          prop: 'text',
          data: {
            develop: true,
            line: 3,
          },
        },
      ],
    },
    {
      label: '评分', //显示的名称
      width: '150',
      props: [
        {
          prop: 'rate',
          type: 'rate',
          data: setData<'rate'>({
            property: {
              colors: [
                store.getters.getThemeColor,
                store.getters.getThemeColor,
                store.getters.getThemeColor,
              ],
              max: 5,
              allowHalf: true,
            },
          }),
        },
      ],
    },
    {
      label: '推荐', //显示的名称
      width: '100',
      props: [
        {
          prop: 'recommend',
          type: 'switch',
          data: setData<'switch'>({
            property: {
              activeColor: store.getters.getThemeColor,
              inactiveValue: 0,
              activeValue: 1,
            },
          }),
        },
      ],
    },
    {
      label: '价格', //显示的名称
      width: '120',
      props: [
        {
          text: '原价：',
          prop: 'oldPrice',
        },
        {
          prop: 'price',
          type: 'input',
          data: setData<'input'>({
            property: {
              placeholder: '请输入现价',
            },
          }),
        },
      ],
    },
    {
      label: '更新时间（远程搜索）', //显示的名称
      sortable: 'custom',
      props: [
        {
          prop: 'date',
        },
      ],
    },
    {
      label: '操作', //显示的标题
      minWidth: '180px',
      fixed: 'right',
      props: [
        {
          type: 'btn',
          prop: '',
          data: setData<'btn'>([
            {
              text: '修改',
              params: 'update',
              property: {
                type: 'primary',
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
      types: '',
      name: '',
    },
    total: 0,
    list: [],
  })

  const selectMenuList = ref([
    {
      value: 0,
      label: '玄幻',
    },
    {
      value: 1,
      label: '都市',
    },
    {
      value: 2,
      label: '真实',
    },
  ])
  // 批量操作
  const operateData: PowerfulTableOperateData = reactive({
    value: 0,
    operates: [
      {
        label: '推荐',
        value: 0,
      },
      {
        label: '取消推荐',
        value: 1,
      },
      {
        label: '删除',
        value: 2,
      },
    ],
  })

  // 编辑区显隐
  const isDialog = ref(false)
  // 编辑区当前数据
  const currentForm = reactive({})

  const selectData = ref([])

  return {
    selectData,
    header,
    powerfulTableData,
    selectMenuList,
    operateData,
    isDialog,
    currentForm,
  }
}
