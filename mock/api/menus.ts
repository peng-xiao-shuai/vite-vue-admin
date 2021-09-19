export type rolesValueItemType = {
  hidden: number,
  icon?: string,
  id: number,
  level: number,
  name: string,
  parentId: number,
  sort?: number,
  title?: string,
}

export type rolesType = {
  [s:string]: rolesValueItemType[]
}
const roles:rolesType = {
  admin: [
    {
      hidden: 0,
      icon: "vitezujian",
      id: 1,
      level: 0,
      name: "modules",
      parentId: 0,
      sort: 997,
      title: "组件列表",
    },
    {
      hidden: 0,
      icon: "viteyonghuliebiao",
      id: 18,
      level: 1,
      name: "form",
      parentId: 1,
      sort: 997,
      title: "表单",
    },
    {
      hidden: 0,
      icon: "viteZJ-biaoge",
      id: 11,
      level: 1,
      name: "table",
      parentId: 1,
      sort: 997,
      title: "表格",
    },
    {
      hidden: 0,
      icon: "viteZJ-fuwenben",
      id: 12,
      level: 1,
      name: "richText",
      parentId: 1,
      sort: 997,
      title: "富文本",
    },
    {
      hidden: 0,
      icon: "viteZJ-shangchuan",
      id: 13,
      level: 1,
      name: "upload",
      parentId: 1,
      sort: 997,
      title: "上传文件",
    },
    {
      hidden: 0,
      icon: "viteviteZJ-ditu",
      id: 14,
      level: 1,
      name: "map",
      parentId: 1,
      sort: 997,
      title: "地图",
    },
    {
      hidden: 0,
      icon: "viteantv",
      id: 15,
      level: 1,
      name: "antv-x6",
      parentId: 1,
      sort: 997,
      title: "antv-x6",
    },
    {
      hidden: 0,
      icon: "vitei",
      id: 16,
      level: 1,
      name: "icon",
      parentId: 1,
      sort: 997,
      title: "图标",
    },
    {
      hidden: 0,
      icon: "vitesign",
      id: 17,
      level: 1,
      name: "sign",
      parentId: 1,
      sort: 997,
      title: "签名",
    },
    {
      hidden: 0,
      icon: "vitetubiao",
      id: 30,
      level: 0,
      name: "eCharts",
      parentId: 0,
      sort: 997,
      title: "图表",
    },
    {
      hidden: 0,
      icon: "vitezhexiantu",
      id: 31,
      level: 1,
      name: "eChartLine",
      parentId: 30,
      sort: 997,
      title: "折线图",
    },
    {
      hidden: 0,
      icon: "vitezhuzhuangtu",
      id: 32,
      level: 1,
      name: "eChartPillar",
      parentId: 30,
      sort: 997,
      title: "柱状图",
    },
    {
      hidden: 0,
      icon: "vitebingzhuangtu",
      id: 32,
      level: 1,
      name: "eChartCake",
      parentId: 30,
      sort: 997,
      title: "饼状图",
    },
    {
      hidden: 0,
      icon: "vitebullseye",
      id: 30,
      level: 0,
      name: "log",
      parentId: 0,
      sort: 997,
      title: "日志",
    },
    {
      hidden: 0,
      icon: "vitebug",
      id: 31,
      level: 1,
      name: "error-log",
      parentId: 30,
      sort: 997,
      title: "错误日志",
    },
    {
      hidden: 0,
      icon: "viteAPI",
      id: 32,
      level: 1,
      name: "ajax-log",
      parentId: 30,
      sort: 997,
      title: "ajax 错误",
    },
    {
      hidden: 0,
      icon: "viteyumaobi",
      id: 32,
      level: 1,
      name: "add-log",
      parentId: 30,
      sort: 997,
      title: "添加日志",
    },
    {
      hidden: 0,
      icon: "viteiframe",
      id: 40,
      level: 0,
      name: "iframe",
      parentId: 0,
      sort: 997,
      title: "iframe",
    },
    {
      hidden: 0,
      icon: "viteiframe",
      id: 41,
      level: 1,
      name: "iframe-",
      parentId: 40,
      sort: 997,
      title: "iframe-",
    },
    {
      hidden: 0,
      icon: "vitelianjie",
      id: 50,
      level: 0,
      name: "interlink",
      parentId: 0,
      sort: 997,
      title: "interlink",
    },
    {
      hidden: 0,
      icon: "vitelianjie",
      id: 51,
      level: 1,
      name: "link",
      parentId: 50,
      sort: 997,
      title: "link",
    },
    {
      hidden: 0,
      icon: "vitemarkdown",
      id: 60,
      level: 0,
      name: "markDown",
      parentId: 0,
      sort: 997,
      title: "markdown",
    },
    {
      hidden: 0,
      icon: "vitemarkdown",
      id: 61,
      level: 1,
      name: "markDownEditor",
      parentId: 60,
      sort: 997,
      title: "markdown",
    },
    {
      hidden: 0,
      icon: "viteyanjing",
      id: 62,
      level: 1,
      name: "markDownPreview",
      parentId: 60,
      sort: 997,
      title: "markdown.preview",
    },
    {
      hidden: 0,
      icon: "vitedirective",
      id: 70,
      level: 0,
      name: "directives",
      parentId: 0,
      sort: 997,
      title: "directive",
    },
    {
      hidden: 0,
      icon: "vitenumber",
      id: 71,
      level: 1,
      name: "number-directive",
      parentId: 70,
      sort: 997,
      title: "数字指令",
    },
    {
      hidden: 0,
      icon: "vitepress-key",
      id: 72,
      level: 1,
      name: "press-key-directive",
      parentId: 70,
      sort: 997,
      title: "按键指令",
    },
    {
      hidden: 0,
      icon: "vitethrottle",
      id: 73,
      level: 1,
      name: "debounce-throttle",
      parentId: 70,
      sort: 997,
      title: "防抖节流指令",
    },
    // 多级路由
    {
      hidden: 0,
      icon: "viteroute",
      id: 80,
      level: 0,
      name: "much-router",
      parentId: 0,
      sort: 997,
      title: "嵌套路由",
    },
    {
      hidden: 0,
      icon: "viteantv",
      id: 81,
      level: 1,
      name: "much-menu-one",
      parentId: 80,
      sort: 997,
      title: "二级菜单（一）",
    },
    {
      hidden: 0,
      icon: "vitecaidanliebiao",
      id: 82,
      level: 1,
      name: "much-menu-two",
      parentId: 80,
      sort: 997,
      title: "二级菜单（二）",
    },
    {
      hidden: 0,
      icon: "viteZJ-fuwenben",
      id: 821,
      level: 2,
      name: "much-menu-two-one",
      parentId: 82,
      sort: 997,
    },
    {
      hidden: 0,
      icon: "vitecaidanliebiao",
      id: 822,
      level: 2,
      name: "much-menu-two-two",
      parentId: 82,
      sort: 997,
      title: "三级级菜单",
    },
    {
      hidden: 0,
      icon: "viteviteZJ-ditu",
      id: 8221,
      level: 3,
      name: "much-menu-three-one",
      parentId: 822,
      sort: 997,
    },
    {
      hidden: 0,
      icon: "vitei",
      id: 8222,
      level: 3,
      name: "much-menu-three-two",
      parentId: 822,
      sort: 997,
    },
    {
      hidden: 0,
      icon: "viteliebiao",
      id: 7,
      level: 1,
      name: "menu",
      parentId: 5,
      sort: 9,
      title: "菜单列表",
    },
    {
      hidden: 1,
      icon: "viteliebiao",
      id: 8,
      level: 1,
      name: "role",
      parentId: 5,
      sort: 2,
      title: "角色列表",
    },
    {
      hidden: 0,
      icon: "viteliebiao",
      id: 9,
      level: 1,
      name: "resource",
      parentId: 5,
      sort: 999,
      title: "资源列表",
    },
  ],
  ordinary: [
    {
      hidden: 0,
      icon: "vitezujian",
      id: 1,
      level: 0,
      name: "modules",
      parentId: 0,
      sort: 997,
      title: "组件列表",
    },
    {
      hidden: 0,
      icon: "viteZJ-biaoge",
      id: 11,
      level: 1,
      name: "table",
      parentId: 1,
      sort: 997,
      title: "表格",
    },
    {
      hidden: 0,
      icon: "viteZJ-fuwenben",
      id: 12,
      level: 1,
      name: "richText",
      parentId: 1,
      sort: 997,
      title: "富文本",
    },
    {
      hidden: 0,
      icon: "viteZJ-shangchuan",
      id: 13,
      level: 1,
      name: "upload",
      parentId: 1,
      sort: 997,
      title: "上传文件",
    },
    {
      hidden: 0,
      icon: "viteviteZJ-ditu",
      id: 14,
      level: 1,
      name: "map",
      parentId: 1,
      sort: 997,
      title: "地图",
    },
    {
      hidden: 0,
      icon: "viteantv",
      id: 15,
      level: 1,
      name: "antv-x6",
      parentId: 1,
      sort: 997,
      title: "antv-x6",
    },
    {
      hidden: 0,
      icon: "vitei",
      id: 16,
      level: 1,
      name: "icon",
      parentId: 1,
      sort: 997,
      title: "图标",
    },
    {
      hidden: 0,
      icon: "vitesign",
      id: 17,
      level: 1,
      name: "sign",
      parentId: 1,
      sort: 997,
      title: "签名",
    }
  ],
};

export default roles;
