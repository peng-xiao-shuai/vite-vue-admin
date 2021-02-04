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