<template>
  <el-drawer
    :title="currentForm.id ? '修改' : '添加'"
    :model-value="dialog"
    direction="rtl"
    ref="drawer"
    @close="close"
  >
    <el-form
      :model="formData"
      :rules="rules"
      ref="uploadForm"
      label-position="top"
      style="padding: 0 20px"
      class="Dform"
    >
      <el-form-item label="菜单名称：" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="上级菜单：">
        <el-select
          v-model="formData.parentId"
          style="width: 100%"
          placeholder="请选择菜单"
        >
          <el-option
            v-for="item in selectMenuList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="前端名称：" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="前端图标：" prop="icon">
        <icon-select
          style="width: 100%"
          v-model:icon="formData.icon"
          type="element"
        />
      </el-form-item>
      <el-form-item label="是否显示：">
        <el-radio-group v-model="formData.hidden" v-if="dialog">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="formData.sort" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button v-if="!formData.id" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { updateMenu } from '@/api/ums/menu'
import { defaultData } from '../indexData'
import iconSelect from '@/components/icon-select/index.vue'

export default defineComponent({
  components: {
    iconSelect,
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    currentForm: {
      type: Object,
      default: () => {},
    },
    selectMenuList: {
      type: Array as PropType<{ title: string; id: string | number }[]>,
      default: () => [],
    },
  },
  emits: ['update:currentForm', 'update:dialog', 'refresh'],
  setup(props, context) {
    const formData = reactive({ ...defaultData })
    const uploadForm = ref<any>(null)
    watch(
      props.currentForm,
      (val) => {
        Object.assign(formData, val)
      },
      {
        immediate: true,
      }
    )

    const close = () => {
      context.emit('update:dialog', false)
      context.emit('update:currentForm', {})
    }

    const onSubmit = () => {
      uploadForm.value.validate((valid: boolean) => {
        if (valid) {
          ElMessageBox.confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(() => {
            updateMenu(formData).then(() => {
              ElMessage.success('修改成功')
            })
            // 刷新父组件
            // setTimeout(() => {
            //   context.emit('refresh', { ...formData })
            //   context.emit('update:dialog', false)
            // }, 300)
          })
        } else {
          ElMessage({
            message: '验证失败',
            type: 'error',
            duration: 1000,
          })
          return false
        }
      })
    }

    const resetForm = () => {
      uploadForm.value.resetFields()
      context.emit('update:currentForm', {})
    }

    return {
      uploadForm,
      formData,
      close,
      resetForm,
      onSubmit,
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur',
          },
        ],
        name: [
          { required: true, message: '请输入前端名称', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur',
          },
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          {
            min: 2,
            max: 140,
            message: '长度在 2 到 140 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
})
</script>

<style>
.el-drawer__body {
  overflow: auto;
}
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>
