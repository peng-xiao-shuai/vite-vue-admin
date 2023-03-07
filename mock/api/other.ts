import { config } from '../apis'
import * as Mock from 'mockjs'

export default [
  {
    url: 'log/ajax',
    type: 'get',
    response: () => {
      return {
        code: 500,
        message: '触发报错！',
      }
    },
  },
  {
    url: 'log/list',
    type: 'get',
    response: (config: config) => {
      const size = Number(config.query.pageSize)
      const num = Number(config.query.pageNum)
      return {
        code: 200,
        data: Mock.mock({
          'list|2': [
            {
              error: '1',
              info: '1',
              url: '1',
              name: '1',
              type: 'Info',
            },
          ],
          pageNum: num,
          pageSize: size,
          totalpageNum: 1,
          total: 2,
        }),
      }
    },
  },
  {
    url: 'minio/upload',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: {
          url: 'http://www.aiiup.cn/uploads/20190821/1-1Z115223503326.jpg',
          name: '花瓶.jpg',
        },
      }
    },
  },
]
