import { config } from '../apis';
import { listPaging } from '../utils'
import { lists, tokenValue, deleteLists } from '../data/list'
import roles from "../api/menus";

type userType = {
  [s: string]: {password: number, token: string}
}
const users: userType = {
  admin: {
    password: 123456,
    token: "admin-token",
  },
  ordinary: {
    password: 123456,
    token: "ordinary-token",
  },
  test: {
    password: 123456,
    token: "test-token",
  },
};

export default [
  {
    url: "admin/login",
    type: "post",
    response: (config: config) => {
      let index = Object.keys(users).indexOf(config.body.username);
      if (index !== -1) {
        if (config.body.password == 123456) {
          return {
            data: {
              token: users[config.body.username].token,
              // tokenHead: "Bearer ",
              tokenHead: "",
            },
            code: 200,
          };
        } else {
          return {
            code: 502,
            message: "密码错误",
          };
        }
      } else {
        return {
          code: 502,
          message: "用户名错误",
        };
      }
    },
  },
  {
    url: "admin/info*",
    response: (config: config) => {
      const data = lists.tokens.filter(item => item.token == config.query.token)[0]

      // console.log(roles[data.username]);
      
      // 每次调用时重新获取数据
      data.menus = roles[data.username].filter(Item => Item.hidden == 1)

      return {
        code: 200,
        data,
        message: "操作成功",
      };
    },
  },
  // 获取用户列表
  {
    url: "admin/userList",
    response: (config: config) => {
      let pageSize = Number(config.query.pageSize);
      let pageNum = Number(config.query.pageNum);
      let username = config.query.username

      const list = username ? lists.tokens.filter((item: tokenValue) => item.username.indexOf(username) !== -1) : lists.tokens

      return {
        code: 200,
        data: listPaging<tokenValue>(pageNum, pageSize, list),
        message: "操作成功",
      };
    },
  },
  // 删除用户列表
  {
    url: "admin/remove",
    type: 'delete',
    response: (config: config) => {
      return {
        code: 200,
        data: deleteLists('tokens',config.body.ids),
      };
    },
  },
  // 获取角色列表
  {
    url: "admin/roleList",
    response: (config: config) => {
      let pageSize = Number(config.query.pageSize);
      let pageNum = Number(config.query.pageNum);
      return {
        code: 200,
        data: listPaging<tokenValue>(pageNum, pageSize, lists.roleLists),
        message: "操作成功",
      };
    },
  },
];
