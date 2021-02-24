import store from '/@/store';

const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '资料类型', //显示的名称
	poprs: [{
		popr: 'type',
		filter:[{key: 0,value: '培训视频'},{key: 1,value: '培训PPT'},{key: 2,value: '培训教育记录'},{key: 3,value: '安全智库'}]
	}],
},{
	label: '预览图片', //显示的名称
	poprs: [{
		popr: 'previewImage',
	}],
},{
	label: '内容介绍', //显示的名称
	poprs: [{
		popr: 'contentIntroduction',
	}],
},{
	label: '星级评分', //显示的名称
	poprs: [{
		popr: 'starRating',
	}],
},{
	label: '资料文件地址', //显示的名称
	poprs: [{
		popr: 'url',
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

export {
	header
}
