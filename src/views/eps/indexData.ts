import store from '/@/store';

const header:any[] = [{
	label: '编号', //显示的标题
	minWidth: '50', //对应列的最小宽度
	sortable: true, //排序
	poprs: [{
		popr: 'id',
	}],
}, {
	label: '企业名称', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'name',
	}],
},{
	label: '所属行业/领域', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'industry',
		text: '行业：'
	},{
		popr: 'field',
		text: '领域：'
	}],
},{
	label: '经营范围/成立时间', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'natureOfBusiness',
		text: '经营范围：'
	},{
		popr: 'establishTime',
		text: '成立时间：'
	}],
},{
	label: '建筑层数/高度/名称', //显示的名称
	overflowTooltip: true,
	poprs: [{
		popr: 'buildingFloors',
		text: '层数：'
	},{
		popr: 'buildingHeightb',
		text: '高度：'
	},{
		popr: 'buildingName',
		text: '名称：'
	}],
},{
	label: '叉车信息', //显示的名称
	poprs: [{
		popr: 'forkliftCertificate',
		filter:[{key: 'true',value: '有'},{key: 'false',value: '无'}],
		text: '是否有证：'
	},{
		popr: 'forkliftNumber',
		text: '数量：'
	}],
},{
	label: '乘客电梯信息', //显示的名称
	poprs: [{
		popr: 'passengerElevatorCertificate',
		filter:[{key: 'true',value: '有'},{key: 'false',value: '无'}],
		text: '是否有证：'
	},{
		popr: 'passengerElevatorNumber',
		text: '数量：'
	}],
},{
	label: '标准化建设情况', //显示的名称
	poprs: [{
		popr: 'construction',
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
