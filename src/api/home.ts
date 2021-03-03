import request from '../utils/request'

// 浏览量图表
export function pageviewChart() {
  return request({
    url: 'home/pageviewChart',
  })
}

// 用户曲线图
export function chartFun() {
  return request({
    url: 'home/chart',
  })
}

// 统计
export function countFun() {
  return request({
    url: 'home/count',
  })
}