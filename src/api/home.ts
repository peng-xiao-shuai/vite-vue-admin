import request from '../utils/request'

// 18个月新增付费用户曲线图
export function addedPayment() {
  return request({
    url: 'home/addedPayment/count',
    method: 'get'
  })
}

// 18个月新增用户曲线图
export function chartFun() {
  return request({
    url: 'home/chart',
    method: 'get'
  })
}

// 30整改统计曲线图
export function rectification() {
  return request({
    url: 'home/rectificationCurve/count',
  })
}

// 30天排查统计曲线图
export function hiddenCurve() {
  return request({
    url: 'home/hiddenCurve/count',
  })
}

// 用户统计
export function countFun() {
  return request({
    url: 'home/count',
  })
}