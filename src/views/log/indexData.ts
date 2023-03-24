import { reactive } from 'vue'
import { parseTime } from '@/utils/parse-time'
import type {
  PowerfulTableHeader,
  PowerfulTableOperateData,
} from 'el-plus-powerful-table-ts'
import { useSettingStore, useUserStore } from '@/stores'

export const useData = <Row = any>() => {
  const header: PowerfulTableHeader<Row>[] = [
    {
      label: '账号名',
      props: [
        {
          prop: 'name',
        },
      ],
    },
    {
      label: '问题信息',
      props: [
        {
          prop: 'info',
        },
      ],
    },
    {
      label: '问题地址',
      props: [
        {
          type: 'href',
          prop: 'url',
          data: {
            prop: 'url',
            style: { fontWeight: 'bold' },
          },
        },
      ],
    },
    {
      label: '问题详情',
      props: [
        {
          prop: 'error',
        },
      ],
    },
    {
      label: '问题时间',
      props: [
        {
          prop: 'time',
        },
      ],
    },
    {
      label: '问题类型',
      props: [
        {
          prop: 'type',
        },
      ],
    },
  ]
  const operateData: PowerfulTableOperateData = reactive({
    value: 0,
    operates: [
      {
        label: '上传',
        value: 0,
      },
    ],
  })
  const settingStore = useSettingStore()
  const userStore = useUserStore()
  const sList = settingStore.errorLog

  const addQuery = reactive({
    url: '',
    info: '',
    error: '',
    // 手动添加的type 为 info
    type: 'Info',
    name: userStore.userInfo.username,
    time: parseTime(new Date()),
  })
  const listQuery = reactive({
    pageNum: 1,
    pageSize: 10,
  })
  return {
    listQuery,
    header,
    operateData,
    addQuery,
    sList,
  }
}
