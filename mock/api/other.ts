import { config } from '../apis';
import * as Mock from "mockjs";

export default [
  {
    url: "log/ajax",
    type: "get",
    response: () => {
      return {
        code: 500,
        message: "触发报错！",
      };
    },
  },
  {
    url: 'log/list',
    type: 'get',
    response: (config: config) => {
      let size = Number(config.query.pageSize);
      let num = Number(config.query.pageNum);
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
            }
          ],
          pageNum: num,
          pageSize: size,
          totalpageNum: 1,
          total: 2,
        })
      }
    }
  }
];
