import { createStore } from 'vuex'

import getters from './getters';
import user, { UserState } from './modules/user';
import settings, { SettingsState } from './modules/settings';

// 为 store state 声明类型
export interface State {
	user: UserState,
	settings: SettingsState,
}

export default createStore<State>({
	// 外部模块
	modules:{
			user,
			settings
	},
	getters
}) 