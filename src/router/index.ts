import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { DefineComponent } from 'vue';

// console.log(router)
import layOut from "@/layout/index.vue";
import much from "@/layout/components/router-view.vue";
import { NextLoading } from '@/utils/loading' // progress bar
// meta 参数
/**
 * @param {string} title 标题
 * @param {string} locale i18n 配置的属性，在language文件夹
 * @param {string} icon 图标
 * @param {string} url 外链
 * @param {string} iframeUrl 内嵌网页
 * @param {string} iframeData 内嵌网页attr
 * @param {boolean} breadcrumb 是否不展示在 “面包屑”组件上展示
 * @param {number} sort 动态添加排序
 */

export interface Routers {
  path: string,
  component: DefineComponent | Function,
  name?: string,
  redirect?: string,
  meta?: {
    title: string,
    icon: string,
    locale?: string,
    breadcrumb?: boolean,
    url?: string,
    iframeUrl?: string,
    iframeData?: any,
  },
  children?: Routers[],
  hidden?: boolean,
  // 动态添加
  sort?: number
}

const routes: Routers[] = [
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
        component: () => import("@/views/home/index.vue"),
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
    component: () => import("@/views/redirect.vue"),
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
    component: () => import("@/views/login/index.vue"),
  },
];

export const addRouter: Routers[] = [
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
        component: () => import("@/views/modules/table/index.vue"),
        meta: {
          title: "表格",
          locale: 'table',
          icon: "viteZJ-biaoge"
        },
      },
      {
        path: "export",
        name: "export",
        component: () => import("@/views/modules/export/index.vue"),
        meta: {
          title: "导出表格",
          locale: 'export',
          icon: "vitequanping",
        },
      },
      {
        path: "antv-x6",
        name: "antv-x6",
        component: () => import("@/views/modules/antv-x6/index.vue"),
        meta: {
          title: "antv-x6",
          locale: 'antv-x6',
          icon: "viteantv",
        },
      },
      {
        path: "upload",
        name: "upload",
        component: () => import("@/views/modules/upload/index.vue"),
        meta: {
          title: "上传文件",
          locale: 'upload.file',
          icon: "viteZJ-shangchaun",
        },
      },
      {
        path: "form",
        name: "form",
        component: () => import("@/views/modules/form/index.vue"),
        meta: {
          title: "表单",
          locale: 'form',
          icon: "viteZJ-shangchaun",
        },
      },
      {
        path: "icon",
        name: "icon",
        component: () => import("@/views/modules/icons/index.vue"),
        meta: {
          title: "图标",
          locale: 'icon',
          icon: "vitei",
        },
      },
      {
        path: "richText",
        name: "richText",
        component: () => import("@/views/modules/rich-text/index.vue"),
        meta: {
          title: "富文本",
          locale: 'rich.text',
          icon: "viteZJ-fuwenben",
        },
      },
      {
        path: "map",
        name: "map",
        component: () => import("@/views/modules/map/index.vue"),
        meta: {
          title: "地图",
          locale: 'map',
          icon: "viteviteZJ-ditu",
        },
      },
      {
        path: "sign",
        name: "sign",
        component: () => import("@/views/modules/sign/sign.vue"),
        meta: {
          title: "签名",
          locale: 'sign',
          icon: "viteviteZJ-sign",
        },
      },
    ],
  },
  {
    path: "/much-router",
    component: layOut,
    redirect: "/much-router/much-menu-one",
    name: "much-router",
    meta: {
      title: "嵌套路由",
      locale: 'nesting.router',
      icon: "viteroute",
    },
    children: [
      {
        path: "much-menu-one",
        name: "much-menu-one",
        component: () => import("@/views/modules/antv-x6/index.vue"),
        meta: {
          title: "二级菜单(一)",
          locale: 'nesting.router.menu.two.1',
          icon: "vitecaidanliebiao",
        },
      },
      {
        path: "much-menu-two",
        name: "much-menu-two",
        component: much,
        meta: {
          title: "二级菜单(二)",
          locale: 'nesting.router.menu.two.2',
          icon: "viteantv",
        },
        children: [
          {
            path: "much-menu-two-one",
            name: "much-menu-two-one",
            component: () => import("@/views/modules/rich-text/index.vue"),
            meta: {
              title: "富文本",
              locale: 'rich.text',
              icon: "viteZJ-fuwenben",
            },
          },
          {
            path: "much-menu-two-two",
            name: "much-menu-two-two",
            component: much,
            meta: {
              title: "三级菜单",
              locale: 'nesting.router.menu.three',
              icon: "vitecaidanliebiao",
            },
            children: [
              {
                path: "much-menu-three-one",
                name: "much-menu-three-one",
                component: () => import("@/views/modules/map/index.vue"),
                meta: {
                  title: "地图",
                  locale: 'map',
                  icon: "viteviteZJ-map",
                },
              },
              {
                path: "much-menu-three-two",
                name: "much-menu-three-two",
                component: () => import("@/views/modules/icons/index.vue"),
                meta: {
                  title: "图标",
                  locale: 'icon',
                  icon: "viteviteZJ-icon",
                },
              },
            ],
          },
        ],
      }
    ],
  },
  {
    path: "/markDown",
    name: "markDown",
    component: layOut,
    redirect: "/markDown/markDownEditor",
    meta: {
      title: "markdown",
      icon: "vitemarkdown",
      locale: 'markdown',
    },
    children: [
      {
        path: "markDownEditor",
        name: "markDownEditor",
        component: () => import("@/views/markdown/index.vue"),
        meta: {
          title: "markdown编辑器",
          locale: 'markdown.editor',
          icon: "vitemarkdown",
        },
      }, {
        path: "markDownPreview",
        name: "markDownPreview",
        component: () => import("@/views/markdown/preview.vue"),
        meta: {
          title: "markdown预览",
          locale: 'markdown.preview',
          icon: "viteyanjing",
        },
      }]
  },
  {
    path: "/eCharts",
    component: layOut,
    redirect: "/eCharts/eChartLine",
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
        component: () => import("@/views/eCharts/line.vue"),
        meta: {
          title: "折线图",
          locale: 'line.chart',
          icon: "vitezhexiantu",
        },
      },
      {
        path: "eChartPillar",
        name: "eChartPillar",
        component: () => import("@/views/eCharts/pillar.vue"),
        meta: {
          title: "柱状图",
          locale: 'pillar.chart',
          icon: "vitezhuzhuangtu",
        },
      },
      {
        path: "eChartCake",
        name: "eChartCake",
        component: () => import("@/views/eCharts/cake.vue"),
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
    redirect: "/log/add-log",
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
        component: () => import("@/views/log/error-log.vue"),
        meta: {
          title: "错误日志",
          locale: 'bug.log',
          icon: "vitebug",
        },
      },
      {
        path: "ajax-log",
        name: "ajax-log",
        component: () => import("@/views/log/ajax-log.vue"),
        meta: {
          title: "ajax 错误",
          locale: 'ajax.log',
          icon: "viteAPI",
        },
      },
      {
        path: "add-log",
        name: "add-log",
        component: () => import("@/views/log/add-log.vue"),
        meta: {
          title: "添加日志",
          locale: 'add.log',
          icon: "viteyumaobi",
        },
      },
    ],
  },
  {
    path: "/directives",
    component: layOut,
    redirect: "/directives/add-log",
    name: "directives",
    meta: {
      title: "指令",
      locale: 'directive',
      icon: "vitedirective",
    },
    children: [
      {
        path: "number-directive",
        name: "number-directive",
        component: () => import("@/views/directives/number.vue"),
        meta: {
          title: "数字指令",
          locale: 'number.directive',
          icon: "vitenumber",
        },
      },
      {
        path: "press-key-directive",
        name: "press-key-directive",
        component: () => import("@/views/directives/press-key.vue"),
        meta: {
          title: "按键指令",
          locale: 'press.key.directive',
          icon: "vitepress-key",
        },
      },
      {
        path: "debounce-throttle",
        name: "debounce-throttle",
        component: () => import("@/views/directives/debounce-throttle.vue"),
        meta: {
          title: "防抖&节流指令",
          locale: 'debounce.throttle.directive',
          icon: "vitethrottle",
        },
      },
      {
        path: "copy-directive",
        name: "copy-directive",
        component: () => import("@/views/directives/copy.vue"),
        meta: {
          title: "复制文本指令",
          icon: "vitecopy",
          locale: "copy.directive",
        },
      },
      {
        path: "demo-directive",
        name: "demo-directive",
        component: () => import("@/views/authority/demo/demo.vue"),
        meta: {
          title: "权限指令",
          icon: "vitecaidanliebiao",
          locale: "demo.directive",
        },
      },
    ],
  },
  {
    path: "/authority",
    component: layOut,
    redirect: "/authority/menu",
    name: "authority",
    meta: {
      title: "权限",
      icon: "vitequanxianguanli-02",
      locale: 'authority',
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: () => import("@/views/authority/admin/index.vue"),
        meta: {
          title: "用户列表",
          icon: "viteyonghuliebiao",
          locale: "user.list",
        },
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("@/views/authority/menu/index.vue"),
        meta: {
          title: "菜单列表",
          icon: "vitecaidanliebiao",
          locale: "menu.list",
        },
      },
      {
        path: "demo",
        name: "demo",
        component: () => import("@/views/authority/demo/demo.vue"),
        meta: {
          title: "权限演示",
          icon: "vitecaidanliebiao",
          locale: "authority.demo",
        },
      },
    ],
  },
  {
    path: "/iframe",
    component: layOut,
    redirect: "/iframe/iframe-",
    name: "iframe",
    meta: {
      title: "iframe",
      locale: 'iframe',
      icon: "viteiframe",
    },
    children: [
      {
        path: "iframe-",
        name: "iframe-",
        component: () => import("@/views/iframe/index.vue"),
        meta: {
          title: "iframe",
          iframeUrl: 'https://cn.vitejs.dev/',
          iframeData: {
            width: '100%',
            height: '650px'
          },
          icon: "viteiframe",
        },
      },
    ],
  },
  {
    path: "/interlink",
    component: layOut,
    redirect: "/interlink/link",
    name: "interlink",
    meta: {
      title: "interlink",
      locale: 'interlink',
      icon: "vitelianjie",
    },
    children: [
      {
        path: "link",
        name: "link",
        component: () => import("@/views/link/index.vue"),
        meta: {
          title: "外链",
          url: 'https://cn.vitejs.dev/',
          icon: "vitelianjie",
        },
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
  history: createWebHistory(),
  routes: routes as RouteRecordRaw[],
});

NextLoading.start()

export default _router;
