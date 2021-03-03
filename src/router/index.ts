import { createRouter, createWebHashHistory } from "vue-router";

// console.log(router)
import layOut from "../views/layout/index.vue";
const routes = [
  {
    path: "/",
    component: layOut,
    redirect: "/home",
    meta: {
      title: "首页",
      icon: "viteshouye",
      // breadcrumb: true
    },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("/@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "viteshouye",
        },
      },
    ],
  },
  {
    path: "/redirect",
    name: "redirect",
    hidden: true,
    component: () => import("/@/views/redirect.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      icon: "about",
    },
    hidden: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("/@/views/login/index.vue"),
  },
];

export const addRouter = [
  {
    path: "/eps",
    component: layOut,
    redirect: "/eps/enterprise",
    name: "eps",
    meta: {
      title: "企业信息管理",
      icon: "viteicon_xinyong_xianxing_jijin-",
    },
    children: [
      {
        path: "enterprise",
        name: "enterprise",
        component: () => import("/@/views/eps/index.vue"),
        meta: {
          title: "企业列表",
          icon: "viteliebiao",
        },
      },
    ],
  },
  {
    path: "/education",
    component: layOut,
    redirect: "/education/educationList",
    name: "education",
    meta: {
      title: "教育信息管理",
      icon: "vitejiaoyu",
    },
    children: [
      {
        path: "educationList",
        name: "educationList",
        component: () => import("/@/views/education/index.vue"),
        meta: {
          title: "教育信息列表",
          icon: "viteliebiao",
        },
      },
    ],
  },
  {
    path: "/gist",
    component: layOut,
    redirect: "/gist/gistList",
    name: "gist",
    meta: {
      title: "排查依据管理",
      icon: "viteyinhuanguanli",
    },
    children: [
      {
        path: "gistList",
        name: "gistList",
        component: () => import("/@/views/gist/index.vue"),
        meta: {
          title: "排查依据列表",
          icon: "viteliebiao",
        },
      },{
        path: "gistOrderList",
        name: "gistOrderList",
        component: () => import("/@/views/gist/order.vue"),
        meta: {
          title: "排查订单列表",
          icon: "viteliebiao",
        },
      }
    ],
  },
  {
    path: "/users",
    component: layOut,
    redirect: "/users/user",
    name: "users",
    meta: {
      title: "用户管理",
      icon: "viteyonghuguanli",
    },
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("/@/views/users/index.vue"),
        meta: {
          title: "用户列表",
          icon: "viteliebiao",
        },
   }],
  },
  {
    path: "/system",
    component: layOut,
    redirect: "/system/config",
    name: "system",
    meta: {
      title: "系统",
      icon: "vitejiaoyu",
    },
    children: [
      {
        path: "config",
        name: "config",
        component: () => import("/@/views/system/index.vue"),
        meta: {
          title: "系统配置",
          icon: "viteliebiao",
        },
      },
    ],
  },
  {
    path: "/ums",
    component: layOut,
    redirect: "/ums/menu",
    name: "ums",
    meta: {
      title: "权限",
      icon: "vitequanxianguanli-02",
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("/@/views/ums/admin/index.vue"),
        meta: {
          title: "用户列表",
          icon: "viteyonghuliebiao",
        },
      },
      {
        path: "role",
        name: "role",
        component: () => import("/@/views/ums/role/index.vue"),
        meta: {
          title: "角色列表",
          icon: "vitejiaose",
        },
      },
      {
        path: "allocMenu",
        name: "allocMenu",
        component: () => import("/@/views/ums/role/allocMenu.vue"),
        meta: {
          title: "分配菜单",
        },
        hidden: true,
      },
      {
        path: "allocResource",
        name: "allocResource",
        component: () => import("/@/views/ums/role/allocResource.vue"),
        meta: {
          title: "分配资源",
        },
        hidden: true,
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("/@/views/ums/menu/index.vue"),
        meta: {
          title: "菜单列表",
          icon: "vitecaidanliebiao",
        },
      },
      {
        path: "resource",
        name: "resource",
        component: () => import("/@/views/ums/resource/index.vue"),
        meta: {
          title: "资源列表",
          icon: "viteziyuanliebiao",
        },
      },
      {
        path: "resourceCategory",
        name: "resourceCategory",
        component: () => import("/@/views/ums/resource/categoryList.vue"),
        meta: {
          title: "资源分类",
        },
        hidden: true,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: () => import("../views/404.vue"),
    hidden: true,
  },
];

const _router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default _router;
