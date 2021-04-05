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

## 自定义配置

**由于 `vite` 不支持 `scss` `export` 的导出，无法在运行中修改全局颜色，但可以在代码中修改<br>**

- **菜单栏颜色配置** `style > menus.scss`
- **全局主题颜色** `style > index.scss`
  **启用 mock**

- **只需在对应运行环境下的 `.env.XX `修改 `VITE_MOCK` 为 `true`**

## 项目设置

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
- [ ] 国际化多语言
- [ ] 图表菜单
- [x] 图标菜单
- [ ] 权限测试菜单
- [ ] 全局 `el-button(el-**)` 大小

**其他功能可以在 `issues` 提出**
