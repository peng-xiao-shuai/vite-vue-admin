<div align="center">
	<img style="width:100px;" object-fit='cover' src="./src/assets/logo.svg">
	<p>&nbsp;</p>
	<p align="center">
      <a href="https://vitejs.dev/" target="_blank">
		    <img src="https://img.shields.io/badge/vite-%3E4.1.0-violet" alt="vite">
		</a>
	    <a href="https://v3.vuejs.org/" target="_blank">
	        <img src="https://img.shields.io/badge/vue.js-vue3.2.x-success" alt="vue">
	    </a>
	    <a href="https://element-plus.gitee.io/#/zh-CN/component/changelog" target="_blank">
	        <img src="https://img.shields.io/badge/element--plus-%3E2.3.0-blue" alt="element plus">
	    </a>
		<a href="https://www.tslang.cn/" target="_blank">
         <img src="https://img.shields.io/badge/typescript-%3E4.0.0-blue" alt="typescript">
	    </a>
		<a href="https://gitee.com/abc1612565136/vite-admin/blob/master/LICENSE" target="_blank">
		    <img src="https://img.shields.io/badge/LICENSE-MIT-success" alt="license">
		</a>
	</p>
	<p>&nbsp;</p>
  <h1>Vite-Vue-Admin</h1>
</div>

[English](./README.md) | **简体中文**

## 文档与预览

[文档地址](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/)
<br >
[演示](https://peng-xiao-shuai.github.io/vite-vue-admin/)

## 介绍

`Vite-Vue-Admin` 是一个前端后台管理模板，它基于 `Vite4.x、Vue3.x、Vue-router4.x、Pinia、Element-plus、TypeScript` 实现。它使用了最新的前端技术栈，内置了 `vue-i18n` 国际化解决方案，动态路由，二开表格组件，`antd-x6`，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。也可以作为一个示例，用于学习 `Vue3、Vite、Ts` 等主流技术。

**主要配置**

- [Pnpm](https://pnpm.io/zh/)
- [Vite](https://cn.vitejs.dev/)
- [Vue](https://cn.vuejs.org/)
- [Pinia](https://pinia.web3doc.top/)
- [Vue-router](https://router.vuejs.org/zh/)
- [Typescript](https://www.tslang.cn/docs/home.html)
- [Axios.js](http://axios-js.com/zh-cn/docs/)
- [Mock.js](http://mockjs.com/)
- [Element-plus](https://element-plus.gitee.io/zh-CN/)

**内置 Element-plus 二开封装**

- `upload-file` (文件上传，支持指定文件格式，文件大小)
- `powerful-table` (多功能表格组件)[文档说明](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-doc.html)

## 项目设置

> **注意事项**

1. 默认是开发版本和发行版本都是使用 `mock`
   发行版本如需禁用 `mock` 请将 `main.ts` 文件下的如下代码取消注释
   并且找到 `.env.production` 文件下的 `VITE_MOCK` 变量修改其 `false`
2. 开发版本禁用 `mock` 请将`.env.development` 文件下的 `VITE_MOCK` 变量修改其 `false`

```js
// main.ts

// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
mockXHR()
// }
```

3. **图片下载成功打不开** [解决方案](https://blog.csdn.net/m0_71182944/article/details/127161279)

```js
// node_modules/mockjs/dist/mock.js
// 原生 XHR
if (!this.match) {
  // 8364行添加
  this.custom.xhr.responseType = this.responseType
  this.custom.xhr.send(data)
  return
}
```

## 安装依赖项

```bash
pnpm install
```

## package.json 命令介绍

```bash
pnpm dev # 项目运行
pnpm build # 项目构建
pnpm tsc # 校验代码类型
pnpm preview # 项目预览
pnpm clean:cache # 清除缓存
pnpm clean:modules # 清除依赖包
pnpm lint:lint-staged # 提交 commit 时校验代码格式
pnpm prepare # 初始化 husky
```

## 如何贡献

非常欢迎你的加入！提一个 `Issue` 或者提交一个 `Pull Request`。

Pull Request:

1. Fork 代码!
2. 创建自己的分支: `git checkout -b feat/xxxx`
3. 提交你的修改: `git commit -am 'feat: add xxxxx'`
4. 推送您的分支: `git push origin feat/xxxx`
5. 提交 `pull request`

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 添加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关，不影响运行结果
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤消 编辑
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等。
  - `workflow` 工作流程改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 计划 （2021-3-30）

- [x] 文件上传
- [x] 腾讯地图（删除）
- [x] 高德地图选点
- [x] 高德地图电子围栏
- [x] 图形编辑
- [x] 签名
- [x] 图标选择
- [x] 国际化多语言
- [x] 图表菜单
- [x] 新增日志菜单 捕获接口报错 以及 `errorHandler`
- [x] 全局公共配置（组件大小， 主题颜色，水印等）
- [x] `markdown` 编辑器（支持公式、表情、流程图...）
- [x] 权限测试菜单（权限指令）
- [ ] 登录密码使用 MD5 加密存本地
- [x] `excel` 导入导出
- [ ] 打印指令、复制指令
- [x] 全局指令

**其他功能可以在 `issues` 提出**

## 捐赠

如果你觉得这个项目帮助到了你，请帮助点击 Star
