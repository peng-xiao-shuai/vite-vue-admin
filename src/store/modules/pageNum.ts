// 表格组件内用于缓存页面的page状态
// 表格暂未启用
const state = {
	pageNums:[]
}

const mutations = {
	pageNumPush(state: any,val: any){
		state.pageNums.push(val)
		console.log(state.pageNums);
	},
    pageNumDel(state: any,val: any){
        state.pageNums.splice(val,1)
    }
}


export default {
	state,
	mutations
}