import request from '../utils/request';

export function login(data: Object){
    return request({
        url:'admin/login',
        method: 'post',
        data
    })
}

export function getUser(params?:Object){
    return request({
        url:'admin/info',
        params
    })
}

export function updatePassword(data:Object){
  return request({
      url:'admin/updatePassword',
      method: 'post',
      data
  })
}

export function logout() {
    return request({
      url: '/admin/logout',
      method: 'post'
    })
  }
  
  export function fetchList(params:object) {
    return request({
      url: '/admin/list',
      method: 'get',
      params: params
    })
  }
  
  export function createAdmin(data:object) {
    return request({
      url: '/admin/register',
      method: 'post',
      data: data
    })
  }
  
  export function updateAdmin(id:number, data:object) {
    return request({
      url: '/admin/update/' + id,
      method: 'post',
      data: data
    })
  }
  
  export function updateStatus(id:number, params:object) {
    return request({
      url: '/admin/updateStatus/' + id,
      method: 'post',
      params: params
    })
  }
  
  export function deleteAdmin(id:number) {
    return request({
      url: '/admin/delete/' + id,
      method: 'post'
    })
  }
  
  export function getRoleByAdmin(id:number) {
    return request({
      url: '/admin/role/' + id,
      method: 'get'
    })
  }
  
  export function allocRole(data:object) {
    return request({
      url: '/admin/role/update',
      method: 'post',
      data: data
    })
  }
  