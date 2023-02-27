import request from '@/utils/request'

export const fetchList = (parentId: number | string, params?: any) =>
  request({
    url: 'menu/list?parentId=' + parentId,
    params,
  })

export const deleteMenu = (ids: (number | string)[]) =>
  request({
    url: 'menu/remove',
    method: 'delete',
    data: {
      ids,
    },
  })

export const updateMenu = (data: any) =>
  request({
    url: 'menu/update',
    method: 'post',
    data,
  })
