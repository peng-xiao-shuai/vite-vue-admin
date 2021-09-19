import request from '../utils/request';

export function logAjax() {
  return request({
    url: 'log/ajax',
    method: 'post',
  })
}

type logList = {
  pageSize: number,
  pageNum: number
}
export function getLogList(params: logList) {
  return request({
    url: 'log/list',
    method: 'get',
    params
  })
}

export function AntvX6(params: {parentId: number}) {
  return request({
    url: 'antvx6/list',
    method: 'get',
    params
  })
}


// 上传媒体
export const media = 'api/minio/upload'