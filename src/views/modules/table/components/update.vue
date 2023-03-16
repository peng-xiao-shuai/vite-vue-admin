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
      <el-form-item label="书名" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload-file
          v-model="formData.image"
          :limit="1"
          tipLabel="当前仅为示例，请改成可上传地址"
        />
      </el-form-item>
      <el-form-item label="类型" prop="types">
        <el-select
          v-model="formData.types"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in selectMenuList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="text">
        <el-input type="textarea" v-model="formData.text" rows="7" />
      </el-form-item>
      <el-form-item label="评分" prop="rate">
        <div class="a">
          <el-rate
            v-model="formData.rate"
            :colors="[themeColor, themeColor, themeColor]"
          />
        </div>
      </el-form-item>
      <el-form-item label="推荐" prop="recommend">
        <el-switch
          v-model="formData.recommend"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <div class="grid grid-c-2">
        <el-form-item label="原价" prop="oldPrice">
          <el-input v-model="formData.oldPrice" />
        </el-form-item>
        <el-form-item label="现价" prop="price">
          <el-input v-model="formData.price" />
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button v-if="!formData.id" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const defaultMenu = {
  name: '',
  image: [],
  types: '',
  text: '',
  rate: 0,
  recommend: '',
  oldPrice: '',
  price: '',
  id: '',
}
export default defineComponent({
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
      type: Array as PropType<{ label: string; value: string | number }[]>,
      default: () => [],
    },
  },
  emits: ['update:currentForm', 'update:dialog', 'refresh'],
  setup(props, context) {
    const formData = reactive({ ...defaultMenu })
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
            if (props.currentForm.id) {
              ElMessage({
                message: '修改成功',
                type: 'success',
                duration: 1000,
              })
            } else {
              setTimeout(() => {
                ElMessage({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000,
                })
              }, 200)
            }

            // 刷新父组件
            setTimeout(() => {
              // 正常情况下 不需要传props.currentForm 直接在父组件刷新接口就行了
              context.emit('refresh', { ...formData })
              context.emit('update:dialog', false)
            }, 200)
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

<style lang="scss" scoped>
// * :deep() .el-form-item {
//   display: flex;
//   align-items: center;
//   .el-form-item__content {
//     width: 100%;
//     display: flex;
//     margin: 0 !important;
//   }
// }
</style>
