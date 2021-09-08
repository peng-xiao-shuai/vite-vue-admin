<template>
	<el-drawer title="全局配置" :model-value="drawer" size="500px" @close="handleClose">
		<template #title>
			<slot name="title">
				<div style="display: flex;align-items: center;">
					<div style="margin-right: 20px;">全局配置</div>
					<el-button @click="defaultSet">恢复默认</el-button>
				</div>
			</slot>
		</template>
		<div style="padding: 0 20px" class="config grid grid-c-2">
			<!-- 全局颜色 -->
			<div>
				<p class="config-title" data-label="全局颜色"></p>
				<div class="config-item" v-for="(item, index) in Object.keys(themeColor)" :key="index">
					<label>{{ t(item) + "颜色" }}</label>
					<el-color-picker v-model="themeColor[item]" @change="handleThemeColor($event, item)">
					</el-color-picker>
				</div>
			</div>

			<!-- Layout -->
			<div>
				<p class="config-title" data-label="Layout"></p>
				<div class="config-item" v-for="(item, index) in settingKeys.show_hide" :key="index">
					<label>{{ item.label }}</label>

					<el-switch v-model="settings.drawerSetting[item.key]" :active-value="1" :inactive-value="0"
						@change="handleUpdateSetting($event, item.key)">
					</el-switch>
				</div>

				<div class="config-item">
					<label>{{ settingKeys.leftMargin.label }}</label>
					<el-input v-model.number="settings.drawerSetting[settingKeys.leftMargin.key]"
						@change="handleUpdateSetting($event, settingKeys.leftMargin.key)">
						<template #suffix>
							<span>px</span>
						</template>
					</el-input>
				</div>
			</div>

			<!-- 菜单颜色 -->
			<div>
				<p class="config-title" data-label="菜单颜色"></p>
				<div class="config-item" v-for="(item, index) in settingKeys.menuColor" :key="index">
					<label>{{ item.label }}</label>
					<el-color-picker v-model="settings.menuColors[item.key]"
						@change="handleMenuColor($event, item.key)"></el-color-picker>
				</div>
			</div>

			<!-- 全局水印 -->
			<div>
				<WaterMark />
			</div>
		</div>
	</el-drawer>
</template>

<script setup>
	import {
		ElMessageBox
	} from 'element-plus'

	import {
		reactive
	} from "vue"
	import {
		useStore
	} from "vuex"
	import {
		getLightColor
	} from '@/utils/theme'
	import {
		toLine
	} from '@/utils/str-convert'
	import WaterMark from './components/watermark'

	const store = useStore()
	let props = defineProps({
		drawer: {
			type: Boolean,
			default: false
		},
	})
	const emit = defineEmits(["update:drawer"])

	const themeColor = store.state.settings.themeColor

	// 恢复默认主题
	const defaultSet = () => {

		ElMessageBox({
				message:'是否恢复默认设置',
				title:'提示',
				cancelButtonText: '取消',
				confirmButtonText: '确定',
				showCancelButton:true
				// type: 'warning',
			})
			.then(() => {
				localStorage.removeItem('themeColors')
				localStorage.removeItem('themeLightColors')
				localStorage.removeItem('waterMark')
				localStorage.removeItem('settings')
				location.reload();
			})
			.catch(() => {})
	}

	// 主题修改
	const handleThemeColor = (color, key) => {
		// 设置主题颜色
		const Tcolors = JSON.parse(window.localStorage.getItem('themeColors') || "{}")
		// 设置light颜色
		const Lcolors = JSON.parse(window.localStorage.getItem('themeLightColors') || "{}")

		if (key === 'primary') {
			store.commit('setThemeColor', {
				key: 'primary',
				val: color
			})
		}

		let colorKey = '--color-' + key
		setTheme(Tcolors, colorKey, color, 'themeColors')


		// 修改:root样式
		document.documentElement.style.setProperty('--menu-logo-color', themeColor.primary)
		document.documentElement.style.setProperty('--menu-item-hover-color', themeColor.primary)

		// 设置不同透明度颜色
		for (let i in new Array(10).fill(10)) {
			if (i % 2 == 1) {
				let colorKey = '--color-' + key + '-light-' + i
				setTheme(Lcolors, colorKey, getLightColor(color, i / 10), 'themeLightColors')
			}
		}

	}

	// 菜单颜色修改
	const handleMenuColor = (color, key) => {
		store.commit('setMenuColor', {
			key,
			val: color
		})
		// 菜单颜色
		const menuColors = JSON.parse(window.localStorage.getItem('menuColors') || "{}")
		const colorKey = '--menu-' + toLine(key)

		setTheme(menuColors, colorKey, color, 'menuColors')
	}

	/** 修改root样式 并且存储本地
	 * @param {object} v Lcolors
	 * @param {string} ckey --color-' + key + '-light-' + i
	 * @param {string} cval red
	 * @param {string} key themeLightColors
	 */
	function setTheme(v, ckey, cval, key) {
		document.documentElement.style.setProperty(ckey, cval)
		v[ckey] = cval
		window.localStorage.setItem(key, JSON.stringify(v))
	}

	const handleClose = () => {
		emit('update:drawer', false)
	}
	const settings = store.state.settings
	const settingKeys = reactive({
		show_hide: [{
				label: '固定顶部',
				key: 'fixed'
			},
			{
				label: '显示顶部标签栏',
				key: 'isTagsView'
			},
			{
				label: '显示左上logo栏',
				key: 'isLogo'
			},
			{
				label: '默认菜单展开',
				key: 'defaultMenu'
			},
			{
				label: '灰色模式',
				key: 'grayMode'
			},
		],
		menuColor: [{
				label: '菜单背景颜色',
				key: 'menuBackground'
			},
			{
				label: '悬浮背景颜色',
				key: 'itemHoverBackground'
			},
			{
				label: '悬浮文字颜色',
				key: 'itemHoverColor'
			},
			{
				label: '下级菜单颜色',
				key: 'childrenBackground'
			},
			{
				label: '下级菜单悬浮背景颜色',
				key: 'childrenHoverBackground'
			},
			{
				label: '菜单文字颜色',
				key: 'submenuTitleColor'
			},
			{
				label: 'logo文字颜色',
				key: 'logoColor'
			},
			{
				label: 'logo背景颜色',
				key: 'logoBackground'
			},
		],
		leftMargin: {
			label: '菜单宽度',
			key: 'leftMargin',
			value: ''
		},
		waterMark: [{
				label: '水印开关',
				key: 'switch'
			},
			{
				label: '水印文字',
				key: 'text'
			},
			{
				label: '背景色透明度',
				key: 'ratio'
			},
			{
				label: '水印颜色',
				key: 'color'
			},
			{
				label: '水印角度',
				key: 'deg'
			},
			{
				label: '水印大小',
				key: 'size'
			},
		],
	})


	// 修改 vuex setting
	const handleUpdateSetting = (val, key) => {
		store.commit('setDrawerSetting', {
			val,
			key
		})

		switch (key) {
			case 'grayMode':
				document.getElementsByTagName('body')[0].style.filter = val === 0 ? 'none' : 'grayscale(1)'
				break
		}
	}
</script>

<style lang="scss" scoped>
	.config {
		& :deep(.config-title) {
			width: 100%;
			height: 1px;
			background: #333;
			position: relative;
			margin: 25px 0;

			&::before {
				content: attr(data-label);
				position: absolute;
				left: 10%;
				top: 0;
				transform: translateY(-50%);
				padding: 0 15px;
				background: #fff;
				color: #666;
				font-size: 15px;
			}
		}

		& :deep(.config-item) {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;

			& .el-input {
				width: 40%;
			}

			label {
				font-size: 14px;
				color: #666;
			}
		}
	}
</style>
