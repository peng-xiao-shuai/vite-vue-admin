import { createApp } from 'vue'
import App from '/@/App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'

import './permission'
import '/@modules/element-plus/lib/theme-chalk/index.css'

import {mockXHR} from '../mock/index';

mockXHR()


createApp(App).use(store).use(router).use(ElementPlus).mount('#app')