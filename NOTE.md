### 修改主题颜色(修改 scss 变量颜色)

</br>

> index.scss

```css
$themeColor: 'red'

:export {
  theme: $themeColor;
}
```

> index.js

```js
import color from "index.scss";

let themeColor = color.theme;

export { themeColor };
```
<hr>

### 不刷新浏览器刷新路由（replace）

</br>

1. 新建路由 replace.vue

> router.js

```js
...
{
    path: '/redirect',
    name: 'redirect',
    hidden: true,
    component: () => import('/@/views/redirect.vue')
}
...
```

> redirect.vue

```js
<script>
import { useRoute, useRouter } from 'vue-router'
export default {
  setup(){
    let router = useRouter()
    let route = useRoute()
    const { params, query } = route

    console.log(route);
    router.replace({
        name: params.__name,
        params,query
    })
  }
}
</script>
```

2. 在需要方法里面写入

```js
router.replace({
  name: "redirect",
  params: {
    ...params,
    __name: name,
  },
  query,
});
```
<hr>

### element-plus $message 的使用

1. 在每个页面引入

```js
// 引入
import { ElMessage } from "element-plus";

// 使用
ElMessage.success("ok");
```

2. provide/inject

```js
// main.ts
import { ElMessage } from "element-plus";

const app = createApp(App);
app.provide("$message", ElMessage);

// index.vue
(inject('$message') as any).success("inject");
```
<hr>

### element-plus $msgbox, $alert, $confirm 和 $prompt 的使用

1. 在每个页面引入

```js
// 引入
import { ElMessageBox  } from "element-plus";

// 使用
ElMessageBox.confirm(...);
```

**对应于上述四个全局方法的调用方法依次为：``ElMessageBox, ElMessageBox.alert, ElMessageBox.confirm 和 ElMessageBox.prompt``调用参数与全局方法相同。**

2. provide/inject

```js
// main.ts
import { ElMessageBox } from "element-plus";

const app = createApp(App);
app.provide("messageBox", ElMessageBox);

// index.vue
(inject('messageBox') as any).confirm(...);
```
<hr>


### jsx 类名样式不生效
```js
import {
  h,
  withScopeId,
  getCurrentInstance,
} from "vue";

const instance = getCurrentInstance();
const withId = withScopeId((instance as any).type.__scopeId);

return withId(() =>
  h("div")
);
```
<hr>

### Vite 主题颜色修改 
``` scss
// 定义变量
$--color-primary: #409eff !default;

div{
  color: var(--color-primary)!important;
}
// 挂载到 root 上
:root{
   color: #{$--color-primary};
}
```

**Js 修改样式**
```js
document.documentElement.style.setProperty('--color-primary', 'red')
```
<hr>

### Vite 使用TSX 
1. 安装
```js
yarn add @vitejs/plugin-vue-jsx

// or

npm install @vitejs/plugin-vue-jsx -D

 ```
2. 配置

 **在 ``vite.config.ts`` 文件中挂载**
 ```ts
 import vueJsx from '@vitejs/plugin-vue-jsx'
 export default defineConfig({
  plugins: [ vueJsx()]
})
 ```

 **``tsconfig.json`` 文件中**
```json
{
  // include 需要包含tsx
"include": ["src/*", "src/**/*.vue", "src/**/*.tsx", "src/**/*.jsx", "src/**/*.ts", "src/**/*.js"],
 "compilerOptions": {
    // 在.tsx文件里支持JSX
    "jsx": "preserve",
 }
}
```

3. 使用
(1) 新建**.tsx 
```js
// index.tsx
export default definedComponents({
  setup(props){
    return ()=>(
      <div>
      Hello,World
      </div>
    )
  }
})

```
(2) 新建**.vue

**<font color='#AD49FF'>不需要``template``。``script``上加``lang='tsx'``</font>**
```js
// index.vue
<script lang='tsx'>
import {definedComponents} from 'vue'
export default definedComponents({
  setup(props){
    return ()=>(
      <div>
      Hello,World
      </div>
    )
  }
})
</script>

```

4. 文档
**jsx语法``See``<a href='https://github.com/vuejs/jsx-next#babel-plugin-jsx-for-vue-30'>https://github.com/vuejs/jsx-next#babel-plugin-jsx-for-vue-30</a>**

5. **探坑**
1. jsx/tsx中循环出来的标签元素上有点击事件的话 会自动调用事件
```js
// 例如
export default definedComponents({
  import {definedComponents} from 'vue'
  setup(props){
    // 会被调用3次
    const click = (val)=>{
      consloe.log(val)
      // 112
      // 112
      // 112
    }
    return ()=>(
      <>
      {[1,2,3].map((item,index)=>{
        return (
          // 而且 这样写拿不到原生事件 event
          <div onClick={click('112')}><>
        )
      })}
      </>
    )
  }
})

```

**正确应该是 onClick={(e)=>{click(e,'112')}} 这样也可以拿到原生事件**
```js
// jsx/tsx中循环出来的标签元素上有点击事件的话 会自动调用事件
// 例如
export default definedComponents({
  setup(props){
    // 只有点击时执行
    const click = (e,val)=>{
      consloe.log(e,val)
    }
    return ()=>(
      <>
      {[1,2,3].map((item,index)=>{
        return (
          <div onClick={(e)=>{click(e,'112')}}><>
        )
      })}
      </>
    )
  }
})

```

2. jsx中 使用 transition
```js
import {Transition,ref} from 'vue'
export default definedComponents({
  setup(props){
    // 只有点击时执行
    const a = ref(false)
    return ()=>(
      <>
        <Transition>
        <div v-show={a}></div>
      </Transition>
    )
  }
})
```