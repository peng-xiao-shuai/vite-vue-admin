import request from '@/utils/request'

/**
 * 获取角色列表
 * @param params
 * @returns
 */
export const getRoleList = (params: any) =>
  request({
    url: 'admin/roleList',
    params,
  })

export const createRole = (data?: any) =>
  request({
    url: '/role/create',
    method: 'post',
    data,
  })

export const updateRole = (id: number | string, data?: any) =>
  request({
    url: '/role/update/' + id,
    method: 'post',
    data,
  })

export const deleteRole = (data?: any) =>
  request({
    url: '/role/delete',
    method: 'post',
    data,
  })
