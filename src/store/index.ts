import { createStore } from 'vuex'

import getters from './getters';
import user from './modules/user';

export default createStore({
    // 外部模块
    modules:{
        user
    },
    getters
})