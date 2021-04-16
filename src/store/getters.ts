const getters = {
	getToken:(state:any) => {
		return state.user.vToken
	},
	getMenus:(state:any) => {
		return state.user.menus
	},
	getThemeColor:(state:any) => {
		return state.settings.themeColor
	},
}

export default getters