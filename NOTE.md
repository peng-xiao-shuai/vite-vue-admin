### 修改主题颜色(修改scss变量颜色)
</br>

>index.scss
``` css
$themeColor: 'red'

:export {
    theme: $themeColor
}
```

>index.js
```js
import color from 'index.scss'

let themeColor = color.theme

export {
    themeColor
}
```

### 不刷新浏览器刷新路由（replace）
</br>

新建路由replace.vue
>router.js
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

>redirect.vue
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
    name: 'redirect',
    params:{
        ...params,
        __name:name
    },
    query
})
```