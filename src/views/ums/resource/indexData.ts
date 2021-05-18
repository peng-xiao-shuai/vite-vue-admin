const header: any[] = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	props: [{
		prop: 'id',
	}],
}, {
	label: '资源名称', //显示的名称
	overflowTooltip: true,
	props: [{
		prop: 'name',
	}],
}, {
	label: '资源路径', //显示的名称
	props: [{
		prop: 'url',
	}],
}, {
	label: '描述', //显示的名称
	props: [{
		prop: 'description',
	}],
}, {
	label: '添加时间', //显示的名称
	props: [{
		prop: 'createTime',
	}],
}, {
	label: '操作', //显示的标题
	minWidth: '100px',
	props: [{
		type: 'btn',
		data: [{
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

const category: any[] = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	props: [{
		prop: 'id',
	}],
}, {
	label: '资源名称', //显示的名称
	overflowTooltip: true,
	props: [{
		prop: 'name',
	}],
}, {
	label: '创建时间', //显示的名称
	props: [{
		prop: 'createTime',
	}],
}, {
	label: '排序', //显示的名称
	sortable: true, //排序
	props: [{
		prop: 'sort',
	}],
}, {
	label: '操作', //显示的标题
	minWidth: '100px',
	props: [{
		type: 'btn',
		data: [{
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
	header,
	category
}
