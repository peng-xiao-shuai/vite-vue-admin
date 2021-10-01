import { ElMessage } from "element-plus";

export type RowType = {
  icon: string,
  id: number,
  roles: string[],
  username: string,
  status: number,
  createTime?: string
}

export const header = [{
	label: '编号', //显示的标题
	minWidth: '80', //对应列的最小宽度
	sortable: true, //排序
	props: [{
		prop: 'id',
	}],
}, {
	label: '帐号', //显示的名称
	overflowTooltip: true,
	props: [{
		prop: 'username',
	}],
}, {
	label: '角色', //显示的名称
	props: [{
		type: 'slot',
		slotName: 'roles',
	}],
}, {
	label: '是否启用', //显示的名称
	props: [{
		prop: 'status',
		type: 'switch',
		data: {
			beforeFunction: (row: RowType) => {
				if (row.id == 1) {
					ElMessage.warning('不允许停用！')
				}

				return  row.id == 1 ? false : true
			}
		}
	}],
}, {
	label: '添加时间', //显示的名称
	props: [{
		prop: 'createTime',
	}],
}, {
	label: '操作', //显示的标题
	minWidth: '180px',
	props: [{
		type: 'btn',
		data: [{
			tip: '分配角色',
			type: 'primary',
			icon: 'el-icon-user',
			emit: 'occupyOne'
		}, 
		// {
		// 	tip: '编辑',
		// 	type: 'warning',
		// 	icon: 'el-icon-edit-outline',
		// 	emit: 'update'
		// }, 
		{
			tip: '删除',
			type: 'danger',
			icon: 'el-icon-delete',
			emit: 'remove',
			showBtn: (row: RowType) => {
				return row.id == 1 ? false : true
			}
		}],
	}]
}]