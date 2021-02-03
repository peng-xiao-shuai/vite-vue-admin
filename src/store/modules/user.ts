import TYPE from "../type/userType"

import Cookies from 'js-cookie'

import { getUser,login } from '/@/api/logins';
import router,{addRouter as asyncRouter}  from '/@/router/index';

// 筛选该账号可展示路由
function menusFilter(menus: []){

	// return new Promise((resovle,reject)=>{
		// 所有一级
		let levelOne:[] = []
		// 所有子集
		let childOne:[] = []

		menus.forEach((item: any) =>{

			if(item.level === 0){
				levelOne.push(item)
			}else{
				childOne.push(item)
			}
		})

		_sort(levelOne)

		let asyncrouter = asyncRouter.filter((item:any)=>{
			let each = addRouterFun(levelOne,item)

			if(each && each.children && each.children.length>0){
				// 获取当前导航所有子集
				each.children = each.children.filter((i:any)=>{
					return addRouterFun(childOne,i)
				})

				_sort(each.children);

			}
			router.addRoute(each)

			return each
		})
		state.menus = router.options.routes.concat(asyncrouter)

		// resovle(state.menus)
	// })
	
}

// 排序
function _sort(arr:[]){
	arr.sort((a:any,b:any)=>{
		return b.sort - a.sort
	})
}

// 格式数据
function addRouterFun(router:[],each:any){
	let item:any
	for(item of router){
		if(item.name == each.name){

			if(item.title){
				each.meta.title = item.title
			}
			if(item.icon){
				each.meta.icon = item.icon
			}

			each.sort = item.sort
			
			return each

		}else{
			each.sort = 0
			if(each.hidden){
				return each
			}
		}
	}
}

const state = {
	token:Cookies.get('token'),
	userInfo:{},
	menus:[]
}

const actions = {
	// 登录
	loginAction({state},user: any){
		new Promise((resolve)=>{
			login(user)
			.then((res: {data:{tokenHead: string , token: string}}) => {
				if(res){
					state.token = res.data.tokenHead + res.data.token
					Cookies.set('token',res.data.tokenHead + res.data.token)
					router.push({path:'/'})
				
				}
				resolve(res)
			})
		})
	},

	// 获取用户信息
	userInfo({commit}){
		return new Promise((resovle) =>{
			getUser({token: state.token})
			.then(async (res:any) => {
				commit(TYPE.LOGIN_THEN,res.data)
				
				menusFilter(res.data.menus)
				
				resovle(state.menus)
			})
		})
	},

	// 登出
	outLoing({commit}){
		commit('outLogin','')
		Cookies.remove('token')
	},
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