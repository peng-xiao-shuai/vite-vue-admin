import { createRouter, createWebHashHistory } from "vue-router";

// console.log(router)
import layOut from "/@/layout/index.vue";
const routes = [
  {
    path: "/",
    component: layOut,
    redirect: "/home",
    meta: {
      title: "首页",
      locale: 'home',
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
          locale: 'home',

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
    path: "/modules",
    component: layOut,
    redirect: "/modules/table",
    name: "modules",
    meta: {
      title: "组件列表",
      locale: 'component.list',
      icon: "vitezujian",
    },
    children: [
      {
        path: "table",
        name: "table",
        component: () => import("/@/views/modules/table/index.vue"),
        meta: {
          title: "表格",
          locale: 'table',
          icon: "viteZJ-biaoge",
        },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("/@/views/modules/upload/index.vue"),
        meta: {
          title: "上传文件",
          locale: 'upload.file',
          icon: "viteZJ-shangchaun",
        },
      },
      {
        path: "richText",

        name: "richText",
        component: () => import("/@/views/modules/rich-text/index.vue"),
        meta: {
          title: "富文本",
          locale: 'rich.text',
          icon: "viteZJ-fuwenben",
        },
      },
      {
        path: "map",

        name: "map",
        component: () => import("/@/views/modules/map/index.vue"),
        meta: {
          title: "地图",
          locale: 'map',
          icon: "viteviteZJ-ditu",
        },
      },
    ],
  },
  {
    path: "/icons",
    component: layOut,
    redirect: "/icons/icon",
    name: "icons",
    meta: {
      title: "图标",
      locale: 'icon',
      icon: "vitei",
    },
    children: [
      {
        path: "icon",
        name: "icon",
        component: () => import("/@/views/icons/index.vue"),
        meta: {
          title: "图标",
          locale: 'icon',
          icon: "vitei",
        },
      },
    ],
  },
  {
    path: "/eCharts",
    component: layOut,
    redirect: "/eCharts/line",
    name: "eCharts",
    meta: {
      title: "图表",
      locale: 'chart',
      icon: "vitetubiao",
    },
    children: [
      {
        path: "eChartLine",
        name: "eChartLine",
        component: () => import("/@/views/eCharts/line.vue"),
        meta: {
          title: "折线图",
          locale: 'line.chart',
          icon: "vitezhexiantu",
        },
      },
      {
        path: "eChartPillar",
        name: "eChartPillar",
        component: () => import("/@/views/eCharts/pillar.vue"),
        meta: {
          title: "柱状图",
          locale: 'pillar.chart',
          icon: "vitezhuzhuangtu",
        },
      },
      {
        path: "eChartCake",
        name: "eChartCake",
        component: () => import("/@/views/eCharts/cake.vue"),
        meta: {
          title: "饼状图",
          locale: 'cake.chart',
          icon: "vitebingzhuangtu",
        },
      },
    ],
  },
  {
    path: "/log",
    component: layOut,
    redirect: "/log/line",
    name: "log",
    meta: {
      title: "日志",
      locale: 'log',
      icon: "vitebullseye",
    },
    children: [
      {
        path: "error-log",
        name: "error-log",
        component: () => import("/@/views/log/error-log.vue"),
        meta: {
          title: "错误日志",
          locale: 'bug.log',
          icon: "vitebug",
        },
      },
      {
        path: "ajax-log",
        name: "ajax-log",
        component: () => import("/@/views/log/ajax-log.vue"),
        meta: {
          title: "ajax 错误",
          locale: 'ajax.log',
          icon: "viteAPI",
        },
      },
      {
        path: "add-log",
        name: "add-log",
        component: () => import("/@/views/log/add-log.vue"),
        meta: {
          title: "添加日志",
          locale: 'add.log',
          icon: "viteyumaobi",
        },
      },
    ],
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
