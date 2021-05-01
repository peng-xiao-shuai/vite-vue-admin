const getters = {
	getToken: (state: any) => {
		return state.user.vToken
	},
	getMenus: (state: any) => {
		return state.user.menus
	},
	getThemeColor: (state: any) => {
		return state.settings.themeColor
	},
	getBugNumber: (state: any) => {
		return state.settings.errorLog.filter((item: any, index: number) => item.type === 'Bug' || item.type === 'Ajax').length
	},
	getBugs: (state: any) => {
		return state.settings.errorLog
	},

}

export default getters