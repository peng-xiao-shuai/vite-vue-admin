import request from '@/utils/request'

/**
 * 登录
 * @param data
 * @returns
 */
export const login = <T>(data: any) => request.post<T>('admin/login', data)

/**
 * 获取用户信息
 * @param params
 * @returns
 */
export const getUser = <T>(params?: any) =>
  request.get<T>('admin/info', { params })

/**
 * 获取用户列表
 * @param params
 * @returns
 */
export const getUserList = (params: any) =>
  request({
    url: 'admin/userList',
    params,
  })
/**
 * 删除用户列表
 * @param params
 * @returns
 */
export const userRemove = (data: any) =>
  request({
    url: 'admin/remove',
    method: 'delete',
    data,
  })

export const logout = () =>
  request({
    url: '/admin/logout',
    method: 'post',
  })
