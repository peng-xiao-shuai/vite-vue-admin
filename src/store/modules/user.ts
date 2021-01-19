import TYPE from "../type/userType"

import Cookies from 'js-cookie'

import { getUser,login } from '/@/api/logins';

const state = {
	token:Cookies.get('token'),
	userInfo:{}
}

const actions = {
	async loginAction({state,commit},user: any){

		commit(TYPE.LOGIN_REQUEST)

		await login(user)
		.then((res: { data:{tokenHead: string , token: string}}) => {
			state.token = res.data.tokenHead + res.data.token
			Cookies.set('token',res.data.tokenHead + res.data.token)
		})

		// 模拟接口
		// 状态 失败or成功
		return new Promise((resovle) =>{
			getUser()
			.then((res:any) => {
				commit(TYPE.LOGIN_THEN,res.data)

				resovle('success')
			})
		})
		
	}
}

const mutations = {

	[TYPE.LOGIN_REQUEST](){
		console.log('开始请求');
	},
	[TYPE.LOGIN_THEN](state:{userInfo: object},val: object){
		console.log('接受数据',val);
		state.userInfo = val
	}
}

export default {
	state,
	actions,
	mutations
}