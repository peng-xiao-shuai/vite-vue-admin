<template>
	<el-card class="box-card">
		<el-form :rules="rules" ref="Form" :model="ruleForm" label-width="80px">
			<el-form-item prop="name" label="活动名称">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item prop="region" label="活动区域">
				<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="date2" label="活动时间">
				<el-config-provider :locale="locale">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;">
						</el-date-picker>

					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
					</el-col>
				</el-config-provider>
			</el-form-item>
			<el-form-item prop="delivery" label="即时配送">
				<el-switch v-model="ruleForm.delivery"></el-switch>
			</el-form-item>
			<el-form-item prop="type" label="活动性质">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item prop="resource" label="特殊资源">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="desc" label="活动形式">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('Form')">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	// 时间选择器 element-plus 自带翻译bug
	import {
		ElConfigProvider
	} from 'element-plus';
	import zhCn from 'element-plus/lib/locale/lang/zh-cn';
	import zhEn from "element-plus/lib/locale/lang/en";

	import {
		ref,
		reactive,
		defineComponent,
		inject
	} from "vue";

	export default defineComponent({
		components: {
			[ElConfigProvider.name]: ElConfigProvider,
		},
		data() {
			return {
				locale: this.defaultData.locale == 'en-US' ? zhEn : zhCn,
				ruleForm: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入活动名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur',
						},
					],
					region: [{
						required: true,
						message: '请选择活动区域',
						trigger: 'change'
					}, ],
					date1: [{
						type: 'date',
						required: true,
						message: '请选择日期',
						trigger: 'change',
					}, ],
					date2: [{
						type: 'date',
						required: true,
						message: '请选择时间',
						trigger: 'change',
					}, ],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change',
					}, ],
					resource: [{
						required: true,
						message: '请选择活动资源',
						trigger: 'change'
					}, ],
					desc: [{
						required: true,
						message: '请填写活动形式',
						trigger: 'blur'
					}, ],
				}
			}
		},
		methods: {
			onSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						alert('submit!')
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		},
	})
</script>

<style scoped>
	.box-card {
		width: 480px;
	}
</style>
