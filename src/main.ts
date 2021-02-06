import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'

import './permission'
import './icons'

// 全局组件
import SvgIcon from './components/SvgIcon/index.vue'// svg component

// 全局静态配置
import defalutData from './config/defalut-data';

// css
// vite 暂不支持scss :export
// import './style/index.scss';
import './style/iconfont.css';
import "element-plus/packages/theme-chalk/src/index.scss";

import {mockXHR} from '../mock/index';

if(process.env.NODE_ENV === 'development'){
    mockXHR()
}

let app = createApp(App)

app.mixin({
    computed:{
        // 全局颜色
        themeColor(){
            return store.getters.getThemeColor
        }
    }
})

app.use(store).use(router).use(ElementPlus).mount('#app')

app.component('svg-icon',SvgIcon)
// 全局挂载

app.config.globalProperties.defalutData=defalutData;