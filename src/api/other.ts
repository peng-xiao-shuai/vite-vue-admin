import request from '@/utils/request'

export const logAjax = () =>
  request({
    url: 'log/ajax',
    method: 'post',
  })

type logList = {
  pageSize: number
  pageNum: number
}
export const getLogList = (params: logList) =>
  request({
    url: 'log/list',
    method: 'get',
    params,
  })

export const AntvX6 = (params: { parentId: string }) =>
  request({
    url: 'antvx6/list',
    method: 'get',
    params,
  })

// 上传媒体
export const media = 'api/minio/upload'
