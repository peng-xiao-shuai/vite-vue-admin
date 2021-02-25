import request from '/@/utils/request'

// 18个月新增付费用户曲线图
export function addedPayment() {
  return request({
    url: 'home/addedPayment/count',
    method: 'get'
  })
}

// 18个月新增用户曲线图
export function userCurve() {
  return request({
    url: 'home/userCurve/count',
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
export function memberCount() {
  return request({
    url: 'home/member/count',
  })
}

// 排查统计
export function hiddenCount() {
  return request({
    url: 'home/hidden/count',
  })
}

// 排查统计
export function rectificationCount() {
  return request({
    url: 'home/rectification/count',
  })
}