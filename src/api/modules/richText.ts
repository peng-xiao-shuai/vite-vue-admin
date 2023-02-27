import request from '@/utils/request'

// 查询富文本
export const richTextFun = () =>
  request({
    url: 'modules/richText',
  })
