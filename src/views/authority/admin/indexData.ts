/*
 * @Description:
 * @Author: chenle
 * @Date: 2023-03-06 09:44:20
 * @LastEditors: chenle
 * @LastEditTime: 2023-03-19 15:55:54
 */
import store from '@/store'
import { ref, markRaw, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { setData } from 'el-plus-powerful-table-ts/es'
import { Edit, Remove } from '@element-plus/icons-vue'
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
} from 'el-plus-powerful-table-ts'

export type RowType = {
  icon: string
  id: number
  roles: string[]
  username: string
  status: number
  createTime?: string
}

interface PowerfulTableData {
  list: RowType[]
  header: any[]
  total: number
  listQuery: {
    pageNum: number
    pageSize: number
    username?: string
  }
}

const defaultData = {
  icon: '',
  id: -1,
  roles: [],
  username: '',
  status: -1,
  createTime: '',
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
      label: '帐号', //显示的名称
      overflowTooltip: true,
      props: [
        {
          prop: 'username',
        },
      ],
    },
    {
      label: '角色', //显示的名称
      props: [
        {
          type: 'slot',
          prop: '',
          slotName: 'roles',
        },
      ],
    },
    {
      label: '是否启用', //显示的名称
      props: [
        {
          prop: 'status',
          type: 'switch',
          data: setData<'switch'>({
            property: (row: any) => {
              return {
                activeColor: store.getters.getThemeColor,
                inactiveValue: 0,
                activeValue: 1,
                beforeChange: () => {
                  if (row.id == 1) {
                    ElMessage.warning('不允许停用！')
                  }
                  return true
                },
              }
            },
          }),
        },
      ],
    },
    {
      label: '添加时间', //显示的名称
      props: [
        {
          prop: 'createTime',
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
              text: '分配角色',
              params: 'occupyOne',
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

  // 弹窗开关
  const switchs = reactive({
    role: false,
    edit: false,
  })

  const powerfulTableData: PowerfulTableData = reactive({
    list: [],
    header: header,
    total: 0,
    listQuery: {
      pageNum: 1,
      pageSize: 10,
      username: '',
    },
  })

  // row 数据
  const currentForm = ref<RowType>({ ...defaultData })

  // 角色列表
  const roleLists = ref<{ label: string; value: string }[]>([])

  return {
    header,
    switchs,
    powerfulTableData,
    currentForm,
    roleLists,
  }
}
