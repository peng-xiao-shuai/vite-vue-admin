const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '帐号', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'username',
	}],
},{
	label: '姓名', //显示的名称
	poprs: [{
		popr: 'nickName',
	}],
},{
	label: '邮箱', //显示的名称
	poprs: [{
		popr: 'email',
	}],
},{
	label: '添加时间', //显示的名称
	poprs: [{
		popr: 'createTime',
	}],
},{
	label: '最后登录', //显示的名称
	poprs: [{
		popr: 'loginTime',
	}],
},{
	label: '是否启用', //显示的名称
    poprs: [{
        popr: 'status',
        type:'switch',
        data:{
			activeColor: 'store.getter.themeColo',
            inactiveText: '隐',
            activeText:"显"
        }
    }],
},{
	label: '操作', //显示的标题
	minWidth:'180px',
	poprs: [{
		type: 'btn',
		data: [{
			tip: '分配角色',
			type: 'primary',
			icon: 'el-icon-user',
			emit: 'occupyOne'
		},{
			tip: '编辑',
			type: 'info',
			icon: 'el-icon-edit-outline',
			emit: 'update'
		}, {
			tip: '删除',
			type: 'danger',
			icon: 'el-icon-delete',
			emit: 'remove'
		}],
	}]
}]

export {
	header
}
