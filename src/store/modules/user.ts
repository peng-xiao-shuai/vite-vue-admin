import TYPE from "../type/userType";

import Cookies from "js-cookie";

import { getUser, login } from "/@/api/logins";
import router, { addRouter as asyncRouter } from "/@/router/index";

// 筛选该账号可展示路由
function menusFilter(menus: []) {
  // return new Promise((resovle,reject)=>{
  // 所有一级
  let levelOne: [] = [];
  // 所有子集
  let childs: [] = [];

  menus.forEach((item: any) => {
    if (item.level === 0) {
      levelOne.push(item);
    } else {
      childs.push(item);
    }
  });

  let asyncrouter = asyncRouter.filter((item: any) => {
    let each = addRouterFun(levelOne, item);
    // 拦截接口数据隐藏的菜单
    if (!each) {
      // console.log('被拦截了',each);
      return false;
    }
    // console.log('一级菜单',each);
    recursion(each, childs);
    // console.log('%c 完整一级路由','color:blue;',each);
    // console.log('%c --------------------------------------','color:blue;font-seze:26px');
    return each;
  });

  _sort(asyncrouter);

  asyncrouter.map((item: any) => router.addRoute(item));

  // console.log('排序好的一级',asyncrouter);

  state.menus = router.options.routes.concat(asyncrouter);

  // resovle(state.menus)
  // })
}
// 排序
function _sort(arr: any) {
  arr.sort((a: any, b: any) => {
    return b.sort - a.sort;
  });
}
// 格式数据
function addRouterFun(router: any[], item: any) {
  let each: any;

  for (each of router) {
    if (item.hidden) {
      item.sort = 0;
      return item;
    }

    if (item.name == each.name && each.hidden != 1) {
      item.meta.id = each.id;
      if (each.title) {
        item.meta.title = each.title;
      }
      if (each.icon) {
        item.meta.icon = each.icon;
      }

      item.sort = each.sort;

      return item;
    }
  }
}

// 递归菜单 查询子集
function recursion(each: any, childs: any) {
  // 所有子集
  let ids: any = [];

  if (!each.children) {
    // console.log('不进入递归',each);
  } else {
    // console.log('进入递归',each);
    if (each.meta && each.meta.id) {
      ids = childs.filter((i: any) => each.meta.id == i.parentId);
      // console.log('接口返回的一级菜单子集',ids);
    }
    if (ids.length > 0) {
      let children: any[] = [];
      for (let childrenItem of each.children) {
        let arr = addRouterFun(ids, childrenItem);

        if (arr) {
          children.push(arr);
          recursion(arr, childs);
        }
      }
      _sort(children);
      // console.log('将添加到一级路由下的子集',children);
      each.children = children;
    } else {
      // 没有则删除
      delete each.children;
    }
  }
}

const state = {
  vToken: Cookies.get("vToken"),
  userInfo: {},
  menus: [],
  tags: [
    {
      name: "home",
      meta: {
        title: "home",
      },
      remove: true,
    },
  ],
  pageNums: [],
};

const actions = {
  // 登录
  loginAction({ state }, user: any) {
    new Promise((resolve) => {
      login(user).then(
        (res: { data: { tokenHead: string; token: string } }) => {
          if (res) {
            state.vToken = res.data.tokenHead + res.data.token;
            Cookies.set("vToken", res.data.tokenHead + res.data.token);
            router.push({ path: "/" });
          }
          resolve(res);
        }
      );
    });
  },

  // 获取用户信息
  userInfo({ commit }, to: any) {
    return new Promise((resovle) => {
      getUser({ token: state.vToken }).then(async (res: any) => {
        commit(TYPE.LOGIN_THEN, res.data);

        menusFilter(res.data.menus);

        resovle(state.menus);
      });
    });
  },

  // 登出
  outLoing({ commit }) {
    commit("outLogin", "");
    Cookies.remove("vToken");
  },

  tagsActions({ commit }, val: any) {
    console.log(val);

    commit("tagsCommit", val);
  },
};

const mutations = {
  pageNumPush(state: any, val: any) {
    state.pageNums.push(val);
    console.log(state.pageNums);
  },
  outLogin(state: any, val: any) {
    state.vToken = val;
    router.push("/login");
  },
  [TYPE.LOGIN_THEN](state: { userInfo: object; menus: [] }, val: any) {
    // console.log('接受数据',val);
    state.userInfo = val;
  },
  tagsCommit(state: any, val: any) {
    if (val.removeIndex !== undefined) {
      console.log("删除");

      state.tags.splice(val.removeIndex, 1);

      console.log(state.tags);

      state.pageNums.splice(val.removeIndex, 1);
    } else {
      state.tags.push(val.to);
    }

    console.log(state.tags);
  },
};

export default {
  state,
  actions,
  mutations,
};
