import type { PowerfulTableHeader } from 'el-plus-powerful-table-ts'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import {
  pageviewChart,
  countFun,
  earningsFun,
  chartFun,
  tableFun,
} from '@/api/home'
const header: PowerfulTableHeader[] = [
  {
    label: '姓名', //显示的名称
    props: [
      {
        prop: 'name',
      },
    ],
  },
  {
    label: '头像', //显示的名称
    width: '80px',
    props: [
      {
        type: 'image',
        prop: 'head',
        data: {
          preview: true,
          style: { width: '40px', height: '40px', borderRadius: '50%' },
        },
      },
    ],
  },
  {
    label: '性别', //显示的名称
    width: '60px',
    props: [
      {
        prop: 'gender',
      },
    ],
  },
  {
    label: '内容', //显示的名称
    props: [
      {
        prop: 'content',
      },
    ],
  },
  {
    label: '时间', //显示的名称
    props: [
      {
        prop: 'date',
      },
    ],
  },
  // {
  //   label: "邮箱", //显示的名称
  //   props: [
  //     {
  //       prop: "email",
  //     },
  //   ],
  // },
  {
    label: '状态', //显示的名称
    props: [
      {
        prop: 'status',
        type: 'tag',
        data: {
          // type: 'primary',
          effect: 'dark',
          color: (tag: string) => {
            return tag == '提交失败' ? '#F56C6C' : '#67C23A'
          },
        },
      },
    ],
  },
]

export type Count = {
  icon: string
  title: string
  value: string
  locale: string
  key: string
  color: any
}

export const useTableData = () => {
  // 表格相关
  let listQuery = reactive({
    pageSize: 3,
    pageNum: 1,
  })
  let list = ref([])
  let tableHeader =
    ref<PowerfulTableHeader<(typeof list.value)[number]>[]>(header)

  // 提交信息
  function handleGetTable(e?: {
    pageNum: number | string
    pageSize: number | string
  }) {
    Object.assign(listQuery, e ? e : {})
    tableFun(listQuery).then((res) => {
      list.value = res.data.list
    })
  }
  handleGetTable()
  return {
    listQuery,
    list,
    tableHeader,
    handleGetTable
  }
}

export const useEchart = () => {
  // 曲线图颜色
  type ChartColor = {
    opacity: number
    color: any
  }
  type UserLineColor = { value: { name: string; color: string }[] }
  interface Earnings {
    value: {
      dayMoney: number | string
      dayPercentage: number | string
      totalMoney: number | string
      totalPercentage: number | string
    }
    chart: {}
  }
  const chartColor: ChartColor[] = [
    {
      opacity: 0.4,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: useStore().state.settings.themeColor.primary,
        },
        {
          offset: 1,
          color: 'rgba(255, 255, 255,0)',
        },
      ]),
    },
    {
      opacity: 0.4,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        {
          offset: 0,
          color: '#55bcff',
        },
        {
          offset: 1,
          color: 'rgba(255, 255, 255,0)',
        },
      ]),
    },
  ]
  // 曲线图线段颜色
  const colors: string[] = [
    useStore().state.settings.themeColor.primary,
    '#55bcff',
    '#F6A829',
    '#646cff',
  ]

  const count = reactive<Count[]>([
    {
      icon: 'vitehome-user',
      title: '用户',
      value: '',
      locale: 'user',
      key: 'users',
      color: 'var(--el-color-primary)',
    },
    {
      icon: 'vitehome-wengzhang',
      title: '文章',
      value: '',
      locale: 'article',
      key: 'shoppings',
      color: '#55bcff',
    },
    {
      icon: 'vitehome-liulanliang',
      title: '浏览量',
      value: '',
      locale: 'page.view',
      key: 'pageview',
      color: '#646cff ',
    },
    {
      icon: 'vitehome-done',
      title: '已提交',
      value: '',
      key: 'done',
      locale: 'commit',
      color: '#F6A829 ',
    },
  ])
  const chart = reactive({ value: {} })
  // 自定义线段颜色
  const userLineColor: UserLineColor = reactive({ value: [] })

  const current = ref(0)
  const earnings = reactive<Earnings>({
    value: {
      dayMoney: '',
      dayPercentage: '',
      totalMoney: '',
      totalPercentage: '',
    },
    chart: {},
  })
  const findTime = ref('Seven')
  let pageViewData = reactive({ value: {} })

  // 浏览量
  function handlePageView() {
    pageviewChart().then((res) => {
      pageViewData.value = res.data
    })
  }
  function handleChart(status: number, period = 'Seven') {
    findTime.value = period

    userLineColor.value = []
    chartFun({ status, period }).then((res) => {
      res.data.homeDateInfoResult.forEach((item: any, index: number) => {
        item.areaStyle = chartColor[index]

        userLineColor.value.push({
          name: item.name,
          color: colors[index],
        })
      })
      chart.value = res.data
    })
  }
  function handleCount() {
    countFun().then((res) => {
      count.forEach((i: Count) => {
        i.value = res.data[i.key]
      })
    })
  }

  // 收益
  function handleEarnings() {
    earningsFun().then((res) => {
      earnings.value = res.data.money

      res.data.chart.homeDateInfoResult.forEach((item: any, index: number) => {
        item.areaStyle = chartColor[index]
      })
      earnings.chart = res.data.chart
      // console.log(earnings);
    })
  }

  // 统计
  handleCount()
  handleChart(0)
  handlePageView()
  handleEarnings()

  return {
    chartColor,
    colors,
    count,
    chart,
    userLineColor,
    current,
    earnings,
    findTime,
    pageViewData,
    handleChart,
  }
}
