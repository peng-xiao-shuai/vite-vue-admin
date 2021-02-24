const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '菜单名称', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'title',
	}],
}, {
	label: '菜单级数', //显示的名称
	poprs: [{
		popr: 'level',
		filter:[{key:0,value:'一级'},{key:1,value:'二级'}]
	}],
}, {
	label: '前端名称', //显示的名称
	poprs: [{
		popr: 'name',
	}],
}, {
	label: '前端图标', //显示的名称
	poprs: [{
		type: 'iconfont',
		popr: 'icon',
		data:{
			style: {fontSize: '24px'},
			class: ['viteIcon']
		}
	}],
},{
	label: '是否显示', //显示的名称
    poprs: [{
        popr: 'hidden',
        type:'switch',
        data:{
			activeValue: 0,
			inactiveValue: 1,
			activeColor: '#11b19e',
            inactiveText: '隐',
            activeText:"显"
        }
    }],
},{
	label: '排序', //显示的标题
    sortable: true, //排序
	poprs: [{
		popr: 'sort',
	}],
},{
	label: '操作', //显示的标题
	minWidth:'180px',
	poprs: [{
		type: 'btn',
		data: [{
			tip: '查看下级',
			type: 'primary',
			icon: 'el-icon-view',
			emit: 'look'
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
