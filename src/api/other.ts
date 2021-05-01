import request from '../utils/request';

export function logAjax() {
  return request({
    url: 'log/ajax',
    method: 'post',
  })
}
export function getLogList(params: any) {
  return request({
    url: 'log/list',
    method: 'get',
    params
  })
}

// 上传媒体
export const media = 'api/minio/upload'