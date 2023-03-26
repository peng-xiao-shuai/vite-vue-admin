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

**English** | [简体中文](./README.zh-CN.md)

## Docs and Preview

[Docs link](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/)
<br >
[Demo](https://peng-xiao-shuai.github.io/vite-vue-admin/)


## introduce
`Vite-Vue-Admin` Is a front-end management template，It is implemented based on `Vite4.x`,` Vue3.x`, `Vue-router4.x`, `Pinia`, `Element-plus`, `TypeScript`. It uses the latest front-end technology stack, built-in `vue-i18n` internationalization solution, dynamic routing, Secondary development of the table component,`antd-x6`，Refined typical business model, provides a wealth of functional components, it can help you quickly build enterprise-level back-end product prototype. It can also be used as an example to learn mainstream technologies such as Vue3, Vite, Ts, etc.

**major dispositions**

- [Pnpm](https://pnpm.io/)
- [Vite](https://vitejs.dev/)
- [Vue](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [Vue-router](https://router.vuejs.org/)
- [Typescript](https://www.tslang.cn/docs/home.html)
- [Axios.js](http://axios-js.com)
- [Mock.js](http://mockjs.com/)
- [Element-plus](https://element-plus.org/en-US/)

**Built-in element-plus Two development Encapsulation**

- `upload-file` (File Upload，Support specified file format,File size)
- `powerful-table` (Multi-function form component)[Documentation readme](https://peng-xiao-shuai.github.io/vite-vue-admin-docs/zh-CN/component/powerful-table-doc.html)

## Project settings

> **Precautions**

1. The default is to use both the development version and the release version `mock`
   If the release version needs to be disabled `mock` Please `main.ts` Uncomment the following code under the file
   And find `.env.production` Under the file `VITE_MOCK` Variable to modify its `false`
2. Development version disabled `mock` Please`.env.development` Under the file `VITE_MOCK` Variable to modify its `false`

```js
// main.ts

// if (
//   import.meta.env.VITE_MOCK === "true"
// ) {
mockXHR()
// }
```

### Install dependencies,

```bash
pnpm install
```

## package.json command introduce

```bash
pnpm dev # project running
pnpm build # Project forming
pnpm tsc # Check code type
pnpm preview # Project preview
pnpm clean:cache # clear cache
pnpm clean:modules # clear node_modules folder
pnpm lint:lint-staged # Verify the code format at commit time
pnpm prepare # init husky
```

## How to Contribute
Welcome to join us! Ask an `Issue` or submit a `Pull Request`.

Pull Request:

1. Fork code!
2. Create your own branch: `git checkout -b feat/xxxx`
3. Submit your changes: `git commit -am 'feat: add xxxxx'`
4. Push your branch: `git push origin feat/xxxx`
5. submit `pull request`

## Git Contribution submission specification

- reference [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) specification ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` Add new features
  - `fix` Fix the problem/BUG
  - `style` The code style is related and does not affect the running result
  - `perf` Optimization/performance improvement
  - `refactor` Refactor
  - `revert` Undo edit
  - `test` Test related
  - `docs` Documentation/notes
  - `chore` Dependency update/scaffolding configuration modification etc.
  - `workflow` Workflow improvements
  - `ci` Continuous integration
  - `types` Type definition file changes
  - `wip` In development

## plan （2021-3-30）

- [x] File Upload
- [x] Tencent map (remove)
- [x] Amap selected points
- [x] Amap electronic fence
- [x] graphic edit (Antd-x6)
- [x] signature
- [x] select icon
- [x] Internationalized multilanguage (i18n)
- [x] tablet menu
- [x] Added log menu to catch interface errors as well `errorHandler`
- [x] Global common configuration (component size, theme color, watermark, etc.)
- [x] `markdown` Editor (support formulas, emoticons, flow charts...)
- [x] Permission Test Menu (Permission instruction)
- [ ] The login password is stored locally using MD5 encryption
- [x] `excel` import and export
- [ ] Print instruction, copy instruction
- [x] Global instruction

**Other functions can be `issues` propose**

## contribute

If you think this project helped you, please help click `Star`
