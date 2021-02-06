const getters = {
	getToken:(state:{user: {token: string}}) => {
		return state.user.token
	},
	getMenus:(state:{user: {menus: []}}) => {
		return state.user.menus
	},
	getThemeColor:(state:{settings: {themeColor: object}}) => {
		return state.settings.themeColor
	}
}

export default getters