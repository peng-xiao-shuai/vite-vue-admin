import { State } from './index';
import { log } from '@/utils/interface';

const getters = {
	getToken: (state: State) => {
		return state.user.vToken
	},
	getMenus: (state: State) => {
		return state.user.menus
	},
	getThemeColor: (state: State) => {
		return state.settings.themeColor.primary
	},
	getBugNumber: (state: State) => {
		return state.settings.errorLog.filter((item: log) => item.type === 'Bug' || item.type === 'Ajax').length
	},
	getBugs: (state: State) => {
		return state.settings.errorLog
	},

}

export default getters