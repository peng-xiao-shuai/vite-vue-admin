# Vite-Vue-Admin

## 介绍

**Cli 配置**

- vue3.X
- vuex@4
- vue-router@4
- vite@2
- typescript
- mock

**内置 element-plus 二开封装**

- `upload-file` (文件上传，支持指定文件格式，文件大小)
- `powerful-table` (多功能表格组件)[文档说明](https://gitee.com/abc1612565136/powerful-table/blob/master/README.md)

## 项目设置

>**注意事项**

1. 默认是开发版本和发行版本都是使用 `mock`
发行版本如需禁用 `mock` 请将 `main.ts` 文件下的如下代码取消注释
并且找到 `.env.production` 文件下的 `VITE_MOCK` 变量修改其 `false`
2. 开发版本禁用 `mock` 请将`.env.development` 文件下的 `VITE_MOCK` 变量修改其 `false`

``` js
// main.ts

// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
  mockXHR();
// }
```

### 一、Install dependencies,

```bash
$ yarn
```

or

```
$ npm install
```

> 推荐使用 yarn , **[yarn 安装与常用命令](http://liqingsong.cc/article/detail/9)** 。

### 二、Compiles and hot-reloads for development

```bash
$ yarn dev
```

or

```
$ npm run dev
```

### 三、Compiles and minifies for production

```bash
$ yarn build
```

or

```
$ npm run build
```

### 四、本地预览生产构建产物

```bash
$ yarn preview
```

or

```
$ npm run preview
```

## 捐赠

如果你觉得这个项目帮助到了你，请帮助点击 Star

## 计划 （2021-3-30）

- [x] 组件菜单 > 文件上传
- [x] 组件菜单 > 腾讯地图
- [x] 国际化多语言
- [x] 图表菜单
- [x] 图标菜单
- [x] 全局 `el-button(el-**)` 大小
- [x] 全局主题颜色修改
- [x] 新增日志菜单 捕获接口报错 以及 errorHandler
- [x] 公共配置
- [x] 使用JSX/TSX /src/layout/components/nav-right
- [ ] 权限测试菜单
- [ ] 工具类

**其他功能可以在 `issues` 提出**
