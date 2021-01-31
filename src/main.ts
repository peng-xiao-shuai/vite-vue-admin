import { createApp } from 'vue'
import App from '/@/App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'

import './permission'
import defalutData from './config/defalut-data';

// css
import '/@modules/element-plus/lib/theme-chalk/index.css'
import './assets/css/iconfont.css';

import {mockXHR} from '../mock/index';

if(process.env.NODE_ENV === 'development'){
    mockXHR()
}

let app = createApp(App)

app.use(store).use(router).use(ElementPlus).mount('#app')

app.config.globalProperties.defalutData=defalutData;