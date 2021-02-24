import store from '/@/store';

const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '标题', //显示的名称
	poprs: [{
		popr: 'title',
	}],
},{
	label: '内容', //显示的名称
	poprs: [{
		popr: 'content',
	}],
},{
	label: '创建人', //显示的名称
	poprs: [{
		popr: 'createBy',
	}],
},{
	label: '修改人', //显示的名称
	poprs: [{
		popr: 'updateBy',
	}],
},{
	label: '操作', //显示的标题
	minWidth:'120px',
	poprs: [{
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

const orderHeader:any[] = [{
	label: '编号', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '企业名称', //显示的名称
	poprs: [{
		popr: 'enterpriseName',
	}],
},{
	label: '企业类型', //显示的名称
	poprs: [{
		popr: 'enterpriseType',
	}],
},{
	label: '排查日期', //显示的名称
	poprs: [{
		popr: 'investigationTime',
	}],
},{
	label: '排查人', //显示的名称
	poprs: [{
		popr: 'investigators',
	}],
},{
	label: '排查订单单号', //显示的名称
	poprs: [{
		popr: 'orderSn',
	}],
},{
	label: '整改期限', //显示的名称
	poprs: [{
		popr: 'rectificationTime',
	}],
}]

export {
	header,
	orderHeader
}
