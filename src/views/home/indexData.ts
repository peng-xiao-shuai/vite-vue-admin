export let header:any = [{
	label: 'ID', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: 'name', //显示的名称
	poprs: [{
		popr: 'name',
	}],
},{
	label: 'headImg', //显示的名称
	poprs: [{
        type: 'image',
		popr: 'head',
        data:{
            preview: true,
            style: {width: '40px',height: '40px',borderRadius: '50%'}
        }
	}],
},{
	label: 'gender', //显示的名称
    width: '80px',
	poprs: [{
		popr: 'gender',
	}],
},{
	label: 'content', //显示的名称
	poprs: [{
		popr: 'content',
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