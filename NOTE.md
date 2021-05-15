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

### 不刷新浏览器刷新路由（replace）

</br>

新建路由 replace.vue

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

在需要方法里面写入

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

### element-plus $message 的使用

1.在每个页面引入

```js
// 引入
import { ElMessage } from "element-plus";

// 使用
ElMessage.success("ok");
```

2.provide/inject

```js
// main.ts
import { ElMessage } from "element-plus";

const app = createApp(App);
app.provide("$message", ElMessage);

// index.vue
(inject('$message') as any).success("inject");
```

### element-plus $msgbox, $alert, $confirm 和 $prompt 的使用

1.在每个页面引入

```js
// 引入
import { ElMessageBox  } from "element-plus";

// 使用
ElMessageBox.confirm(...);
```

对应于上述四个全局方法的调用方法依次为：ElMessageBox, ElMessageBox.alert, ElMessageBox.confirm 和 ElMessageBox.prompt，调用参数与全局方法相同。

2.provide/inject

```js
// main.ts
import { ElMessageBox } from "element-plus";

const app = createApp(App);
app.provide("messageBox", ElMessageBox);

// index.vue
(inject('messageBox') as any).confirm(...);
```

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
