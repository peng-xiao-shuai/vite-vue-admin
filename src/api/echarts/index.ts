import request from '@/utils/request'

// 折线图
export const lineFun = () =>
  request({
    url: 'echart/line',
  })
// 柱状图
export const pillarFun = () =>
  request({
    url: 'echart/pillar',
  })
// 饼状图
export const cakeFun = () =>
  request({
    url: 'echart/cake',
  })
