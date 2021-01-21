import TYPE from "../type/userType"

import Cookies from 'js-cookie'

import { getUser,login } from '/@/api/logins';
import router,{addRouter as asyncRouter}  from '/@/router/index';

// 筛选该账号可展示路由
function menusFilter(menus: []){

	menus.forEach((item: any) =>{
		let filter: [] = asyncRouter.filter((each: any) => each.name == item.name)

		if(filter.length > 0){
			
			router.addRoute(filter[0])
			
			state.menus = router.options.routes.concat(filter)

			console.log(state.menus);
			
		}
	})

	// console.log(router);

}

const state = {
	token:Cookies.get('token'),
	userInfo:{},
	menus:[]
}

const actions = {
	// 登录
	loginAction({state},user: any){
		login(user)
		.then((res: { data:{tokenHead: string , token: string}}) => {
			state.token = res.data.tokenHead + res.data.token
			Cookies.set('token',res.data.tokenHead + res.data.token)

			router.push({path:'/'})
		})
	},

	// 获取用户信息
	userInfo({commit}){
		return new Promise((resovle) =>{
			getUser()
			.then((res:any) => {
				commit(TYPE.LOGIN_THEN,res.data)
				
				menusFilter(res.data.menus)
				
				resovle(res.data.menus)
			})
		})
	},

	// 登出
	outLoing({commit}){
		commit('outLogin','')
		Cookies.remove('token')
	},

	navTo({},val){
		router.push(val)
	}
}

const mutations = {
	outLogin(state: any,val: any){
		state.token = val
		router.push('/login')
	},
	[TYPE.LOGIN_THEN](state:{userInfo: object,menus: []},val: any){
		// console.log('接受数据',val);
		state.userInfo = val
	}
}

export default {
	state,
	actions,
	mutations
}