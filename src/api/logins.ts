import request from '../utils/request';

/**
 * 登录
 * @param data 
 * @returns 
 */
export function login(data: Object){
    return request({
        url:'admin/login',
        method: 'post',
        data
    })
}

/**
 * 获取用户信息
 * @param params 
 * @returns 
 */
export function getUser(params?:Object){
    return request({
        url:'admin/info',
        params
    })
}

/**
 * 获取用户列表
 * @param params 
 * @returns 
 */
export function getUserList(params:object) {
  return request({
    url: 'admin/userList',
    params: params
  })
}

/**
 * 删除用户列表
 * @param params 
 * @returns 
 */
export function userRemove(data:Object){
  return request({
      url:'admin/remove',
      method: 'delete',
      data
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}