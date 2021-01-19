const getters = {
	getToken:(state:{user: {token: string}}) => {
		return state.user.token
	}
}

export default getters