import { createStore } from 'vuex'

import getters from './getters';
import user from './modules/user';
import settings from './modules/settings';
import pageNum from './modules/pageNum';

export default createStore({
    // 外部模块
    modules:{
        user,
        settings,
        pageNum
    },
    getters
}) 