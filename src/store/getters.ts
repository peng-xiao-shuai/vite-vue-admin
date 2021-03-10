const getters = {
	getToken:(state:{user: {vToken: string}}) => {
		return state.user.vToken
	},
	getMenus:(state:{user: {menus: []}}) => {
		return state.user.menus
	},
	getThemeColor:(state:{settings: {themeColor: object}}) => {
		return state.settings.themeColor
	}
}

export default getters