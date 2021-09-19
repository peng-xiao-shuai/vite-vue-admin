import roles, { rolesValueItemType } from "./menus";
import { config } from '../apis';

type tokenValue = {
  icon: string,
  id: number,
  menus: rolesValueItemType[],
  roles: string[],
  username: string
}

type tokensType = {
  [s:string]: tokenValue
}

const tokens: tokensType = {
  "admin-token": {
    icon:
      "https://avatars.githubusercontent.com/u/53845479?v=4",
    id: 3,
    menus: roles["admin"],
    roles: ["admin"],
    username: "admin",
  },
  "editor-token": {
    icon:
      "https://avatars.githubusercontent.com/u/53579755?v=4",
    id: 3,
    menus: roles["ordinary"],
    roles: ["ordinary"],
    username: "ordinary",
  },
};

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
    token: "editor-token",
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
      console.log(tokens[config.query.token]);
      return {
        code: 200,
        data: tokens[config.query.token],
        message: "操作成功",
      };
    },
  },
];
