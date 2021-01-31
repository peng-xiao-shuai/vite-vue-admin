const getters = {
	getToken:(state:{user: {token: string}}) => {
		return state.user.token
	},
	getMenus:(state:{user: {menus: []}}) => {
		return state.user.menus
	},
	getThemeColor:(state:{assets: {themeColor: object}}) => {
		return state.assets.themeColor
	}
}

export default getters