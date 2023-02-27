import request from '../../utils/request'

// 获取系统配置数据
export const getSettings = () =>
  request({
    url: 'system/config/list/settings',
  })

// 获取系统配置数据
export const setSetting = (data: any) =>
  request({
    url: 'system/config/setting',
    method: 'post',
    data,
  })
