import request from '@/utils/request'

// 查询列表
type paramsType = {
  pageSize: number
  pageNum: number
  date?: string
  types?: string
  name?: string
}
export const tableFun = (params: paramsType) =>
  request({
    url: 'modules/table',
    params,
  })

/**
 * 删除商品
 * @param {number[]} ids
 * @returns {object}
 */
export const bookListsDelete = (ids: number[]) =>
  request({
    url: 'modules/table/remove',
    method: 'delete',
    data: {
      ids,
    },
  })
