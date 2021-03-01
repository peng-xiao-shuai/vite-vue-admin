import request from '../../utils/request'

export function fetchList(params) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: params
  })
}

export function createResource(data) {
  return request({
    url: '/resource/create',
    method: 'post',
    data: data
  })
}

export function updateResource(id, data) {
  return request({
    url: '/resource/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteResource(id) {
  return request({
    url: '/resource/delete/' + id,
    method: 'post'
  })
}

export function fetchAllResourceList() {
  return request({
    url: '/resource/listAll',
    method: 'get'
  })
}

// 资源分类数据

export function listAllCate() {
  return request({
    url: '/resourceCategory/listAll',
    method: 'get'
  })
}

export function createResourceCategory(data) {
  return request({
    url: '/resourceCategory/create',
    method: 'post',
    data: data
  })
}

export function updateResourceCategory(id, data) {
  return request({
    url: '/resourceCategory/update/' + id,
    method: 'post',
    data: data
  })
}

export function deleteResourceCategory(id) {
  return request({
    url: '/resourceCategory/delete/' + id,
    method: 'post'
  })
}

