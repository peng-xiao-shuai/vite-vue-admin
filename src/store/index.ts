import { createStore } from 'vuex'

import getters from './getters';
import user from './modules/user';
import assets from './modules/assets';

export default createStore({
    // 外部模块
    modules:{
        user,
        assets
    },
    getters
})