import store from '/@/store';

const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '昵称', //显示的名称
	poprs: [{
		popr: 'nickname',
	}],
},{
	label: '头像', //显示的名称
	poprs: [{
		type: 'image',
		popr: 'icon',
		data: {
			style: {
				width:'50px',
				height: '50px',
				borderRadius: '10px'
			},
			lazy: true,
			preview: true,
		},
	}],
},{
	label: '电话', //显示的名称
	poprs: [{
		popr: 'phone',
	}],
},{
	label: '性别', //显示的名称
	poprs: [{
		popr: 'gender',
		filter:[{key: 0,value: '未知'},{key: 1,value: '男'},{key: 2,value: '女'}]
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
		}],
	}]
}]

export {
	header,
}
