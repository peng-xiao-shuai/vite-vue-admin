<template>
  <!-- 封装单图 -->
  <div style="display: flex">
    <el-upload
      class="upload-demo"
      ref="uploadRef"
      :on-progress="onProgress"
      :show-file-list="true"
      :on-success="handleSuccess"
      :on-exceed="onExceed"
      :on-error="onError"
      :limit="props.limit"
      :multiple="props.limit > 1"
      :action="data.uploadUrl"
      :before-upload="beforeUpload"
      :disabled="data.loading || props.disabled"
      v-model:file-list="fileList"
      list-type="picture-card"
      v-bind="$attrs"
    >
      <template #default>
        <slot name="default">
          <el-icon :disabled="data.loading">
            <Loading v-if="data.loading" />
            <Plus v-else />
          </el-icon>
        </slot>
      </template>

      <template #tip>
        <div class="el-upload__tip">
          {{
            props.tipLabel ||
            ('支持格式' + typeof props.suffixStr == 'object'
              ? [props.fileType]
              : props.suffixStr)
          }}
        </div>
      </template>

      <template #file="{ file }">
        <template v-if="$slots.file">
          <slot name="file" :file="file"></slot>
        </template>
        <div class="file _flex _flex-center" v-else>
          <el-icon class="position pointer" @click="handleRemove(file)">
            <CircleClose />
          </el-icon>
          <el-image
            v-if="fileType == 0"
            :lazy="true"
            :fit="'fill'"
            :src="file.url"
            :preview-src-list="[file.url]"
          />
          <video
            v-else-if="fileType == 1"
            :src="file.url"
            class="avatar video-avatar"
            controls="true"
          >
            您的浏览器不支持视频播放
          </video>
          <div class="_flex _flex-center _flex-wrap file-type" v-else>
            <el-icon>
              <DocumentChecked />
            </el-icon>
            <div class="_word-break">{{ file.name }}</div>
          </div>
        </div>
      </template>
    </el-upload>
  </div>

  <el-progress
    v-show="data.percentFlag"
    type="circle"
    :width="100"
    :percentage="data.uploadPercent"
    style="margin-top: 7px"
  />
</template>

<script lang="ts" setup>
import { nextTick, watch, ref, reactive } from 'vue'
import type {
  ElUpload,
  UploadFile,
  UploadRawFile,
  UploadUserFile,
} from 'element-plus/es'
import { ElMessage } from 'element-plus/es'
import { media } from '@/api/other'
import {
  CircleClose,
  DocumentChecked,
  Plus,
  Loading,
} from '@element-plus/icons-vue'

const ENV = import.meta.env

const props = withDefaults(
  defineProps<{
    modelValue: UploadUserFile[]
    limit?: number
    tipLabel?: string
    // 上传类型 0 图片 1视频 2文件
    fileType?: number | string
    type?: number | string
    // 大小
    fileSize?: number | string
    disabled?: boolean
    // 格式
    suffixStr?: string[] | string
  }>(),
  {
    limit: 1,
    tipLabel: '支持格式jpg、jpeg、png',
    fileType: 0,
    type: 0,
    fileSize: 20,
    disabled: false,
    suffixStr: () => [
      'jpg、jpeg、png',
      'mp4、ogg、flv、avi、wmv、rmvb、mov',
      'pdf、txt、doc、docx、excel、ppt',
    ],
  },
)

const emits = defineEmits(['update:modelValue'])
const fileList = ref<UploadUserFile[]>([])
const uploadRef = ref<InstanceType<typeof ElUpload> | null>(null)
const data = reactive({
  loading: false,
  deleteUrl: ENV.VITE_BASE_URL + 'admin/file/delete',
  uploadPercent: 0,
  percentFlag: false,
  multiple: false,
  uploadUrl: ENV.VITE_BASE_URL + media,
})

watch(
  () => props.modelValue,
  (val) => {
    nextTick(() => {
      fileList.value = val
    })
  },
  {
    immediate: true,
  },
)

const onError = (err: Error, uploadFile: UploadFile) => {
  ElMessage.error('上传失败')
  data.percentFlag = false
  data.loading = false
}
// 上传时
const onProgress = (event: Event, uploadFile: UploadFile) => {
  console.log(event, uploadFile)

  data.loading = true
  data.uploadPercent = Number(uploadFile.percentage?.toFixed(2))
  data.percentFlag = true
}
// 上传前
const beforeUpload = (rawFile: UploadRawFile) => {
  if (fileList.value.length >= props.limit) {
    ElMessage.warning('超出最大上传数量' + props.limit + '！')
    return false
  }

  if (rawFile.size! / 1024 / 1024 >= Number(props.fileSize)) {
    ElMessage({
      message: '文件大小不能超过' + props.fileSize + 'MB',
      type: 'warning',
    })
    return false
  }

  let last = rawFile.name.lastIndexOf('.')
  let suffix = rawFile.name.substring(last + 1, rawFile.name.length)

  let suffixStr =
    typeof props.suffixStr == 'object'
      ? (props.suffixStr as Indexes)[props.fileType]
      : props.suffixStr

  if (!suffixStr.match(suffix)) {
    ElMessage.warning('只能上传' + suffixStr + '的文件')
    return false
  } else {
    // console.log('后缀名正确');
  }
}
// 上传成功
const handleSuccess = (response: any) => {
  if (response.code == 200) {
    // 关闭进度条
    data.uploadPercent = 100
    setTimeout(() => {
      data.percentFlag = false
      data.loading = false
      data.uploadPercent = 0
      // 自定义事件返回给父组件
      emits('update:modelValue', fileList.value)
    }, 400)
  } else {
    ElMessage.error('上传失败！')
  }
}
// 超出数量
const onExceed = (files: File[]) => {
  ElMessage.warning('超出最大上传数量' + props.limit + '！')
}
// 删除
const handleRemove = (file: UploadFile) => {
  uploadRef.value!.handleRemove(file)

  // 自定义事件返回给父组件
  emits('update:modelValue', fileList.value)
  ElMessage.success('删除成功！')
}

defineExpose({
  data,
  uploadRef,
  handleRemove,
})
</script>
<script lang="ts">
export default {
  name: 'UploadFile',
}
</script>
<style lang="scss" scoped>
.file {
  position: relative;
  width: 100%;
  height: 100%;

  .file-type {
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    i {
      font-size: 50px;
      margin-bottom: 10px;
    }
  }

  .position {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    width: 30px;
    height: 30px;
    font-size: 20px;
    border-bottom-left-radius: 10px;
    background: var(--el-fill-color);
    transition: var(--el-transition-duration);
    color: var(--el-text-color-regular);

    &:hover {
      background: var(--el-color-danger);
      color: #fff;
    }
  }
}

.upload-demo :deep(.el-upload__tip) {
  margin: 10px 0;
}
</style>
