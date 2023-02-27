import request from '@/utils/request'

// 浏览量图表
export const pageviewChart = () =>
  request({
    url: 'home/pageviewChart',
  })

// 收益
export const earningsFun = () =>
  request({
    url: 'home/earnings',
  })

/**
 * 曲线图
 * @param status 0=> 粉丝 1=> 用户 2=> 浏览量 3=> 已提交
 * @param period month=> 月 fifteen=> 15天 seven=> 7天
 * @returns
 */
export const chartFun = (params: { status: number; period: string }) =>
  request({
    url: 'home/chart',
    params,
  })

// 统计
export const countFun = () =>
  request({
    url: 'home/count',
  })

// 表格
export const tableFun = (params: any) =>
  request({
    url: 'home/table',
    params,
  })
