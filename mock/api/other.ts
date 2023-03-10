import { config } from '../apis'
import * as Mock from 'mockjs'

const fenceList = {
  list: [
    {
      fencePath: [
        [112.923105, 28.229944],
        [112.923071, 28.228747],
        [112.921781, 28.226145],
        [112.921645, 28.224918],
        [112.933937, 28.225337],
        [112.93431, 28.225756],
        [112.934107, 28.230333],
        [112.933699, 28.230602],
        [112.92813, 28.230154],
        [112.923309, 28.230064],
      ],
      fenceCode: 'cs',
      fenceName: '长沙',
      id: 1,
    },
  ],
}

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
    url: 'fence/list',
    type: 'get',
    response: (config: config) => {
      const { name } = config.query
      const findList = name
        ? fenceList.list.filter((item) => item.fenceName == name)
        : fenceList.list
      return {
        code: 200,
        data: findList,
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
