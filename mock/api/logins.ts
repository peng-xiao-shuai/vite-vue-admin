import roles from "./menus";

const tokens: any = {
  "admin-token": {
    icon:
      "https://portrait.gitee.com/uploads/avatars/user/2660/7980619_wx_7c73acaa7c_1598404785.jpeg!avatar200",
    id: 3,
    menus: roles["admin"],
    roles: ["admin"],
    username: "admin",
  },
  "editor-token": {
    icon:
      "https://portrait.gitee.com/uploads/avatars/user/2660/7980619_wx_7c73acaa7c_1598404785.jpeg!avatar200",
    id: 3,
    menus: roles["ordinary"],
    roles: ["ordinary"],
    username: "ordinary",
  },
};
const users: any = {
  admin: {
    password: 123456,
    token: "admin-token",
  },
  ordinary: {
    password: 123456,
    token: "editor-token",
  },
};

interface config {
  body: any;
  method: string;
  query: any;
}

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
