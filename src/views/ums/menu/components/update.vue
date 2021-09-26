<template>
  <el-drawer
    :title="currentFrom.id ? '修改' : '添加'"
    v-model="dialog"
    direction="rtl"
    ref="drawer"
    @close="close"
  >
    <el-form
      :model="currentFrom"
      :rules="rules"
      ref="menuFrom"
      label-width="100px"
      style="padding: 0 20px"
    >
      <el-form-item label="菜单名称：" prop="title">
        <el-input v-model="currentFrom.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select
          v-model="currentFrom.parentId"
          style="width: 100%"
          placeholder="请选择菜单"
        >
          <el-option
            v-for="item in selectMenuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称：" prop="name">
        <el-input v-model="currentFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="前端图标：" prop="icon">
        <icon-select v-model:icon="currentFrom.icon"></icon-select>
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="currentFrom.hidden" v-if="dialog">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="currentFrom.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!currentFrom.id" @click="resetForm('menuFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { updateMenu } from '@/api/ums/menu'
import iconSelect from "@/components/icon-select/index.vue";

const defaultMenu = {
  title: '',
  parentId: 0,
  name: '',
  icon: '',
  hidden: 0,
  sort: 0
}
export default {
  name: "MenuDetail",
  components: {
    iconSelect
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    currentFrom: {
      type: Object,
      default: () => { }
    },
    selectMenuList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入前端名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  emits: ['update:currentFrom', 'update:dialog', 'refresh'],
  methods: {
    close () {
      this.$emit('update:dialog', false)
      this.$emit('update:currentFrom', { parentId: 0, hidden: 0, sort: 0 })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateMenu(this.currentFrom).then(response => {
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              })
              this.$emit('update:dialog', false)

            })
            // 刷新父组件
            setTimeout(() => {
              this.$emit('refresh')
            }, 300)
          })

        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:currentFrom', { parentId: 0, hidden: 0, sort: 0 })
    },
  }
}
</script>

<style scoped>
</style>
