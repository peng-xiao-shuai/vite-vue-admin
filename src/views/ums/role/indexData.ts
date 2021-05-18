const header: any[] = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	props: [{
		prop: 'id',
	}],
}, {
	label: '角色名称', //显示的名称
	overflowTooltip: true,
	props: [{
		prop: 'name',
	}],
}, {
	label: '描述', //显示的名称
	props: [{
		prop: 'description',
	}],
}, {
	label: '用户数', //显示的名称
	props: [{
		prop: 'adminCount',
	}],
}, {
	label: '添加时间', //显示的名称
	props: [{
		prop: 'createTime',
	}],
}, {
	label: '是否启用', //显示的名称
	props: [{
		prop: 'status',
		type: 'switch',
		data: {
			activeColor: 'store.getter.themeColo',
			inactiveText: '隐',
			activeText: "显"
		}
	}],
}, {
	label: '操作', //显示的标题
	minWidth: '100px',
	props: [{
		type: 'btn',
		data: [{
			tip: "分配菜单",
			type: 'primary',
			icon: 'el-icon-more',
			emit: 'occupyOne'
		}, {
			tip: '分配资源',
			type: 'primary',
			icon: 'el-icon-turn-off',
			emit: 'occupyTwo'
		}, {
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
