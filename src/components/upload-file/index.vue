<template>
  <!-- 封装单图 -->
  <div>
    <div style="display: flex">
      <el-upload
        class="upload-demo"
        ref="upload"
        :on-progress="onProgress"
        :show-file-list="fileType == 2 ? true : false"
        :on-success="handleSuccess"
        :on-exceed="onExceed"
        :on-error="onError"
        :on-remove="onRemove"
        :limit="limit"
        :multiple="limit > 1"
        :action="uploadUrl"
        :before-upload="beforeUpload"
        :disabled="icon != '' || disabled"
      >
        <el-button :icon="icon" type="primary" :disabled="icon != ''"
          >上传</el-button
        >

        <template #tip>
          <div class="el-upload__tip">
            {{ !tipLabel ? "支持格式" + suffixStr[fileType] : tipLabel }}
          </div>
        </template>
      </el-upload>

      <!-- <span class="jianyi">{{ tipLabel }}</span> -->
    </div>

    <!-- 展示图片 -->
    <div class="imgArr">
      <template v-if="imgArr.length != 0 && fileType == 0">
        <div class="item" v-for="(item, index) in imgArr" :key="index">
          <i class="el-icon-circle-close position" @click="Remove(index)"></i>
          <el-image
            :lazy="true"
            :fit="'fill'"
            style="width: 100px"
            :src="item"
            :preview-src-list="[item]"
          ></el-image>
        </div>
      </template>

      <template v-if="imgArr.length != 0 && fileType == 1">
        <div class="item" v-for="(item, index) in imgArr" :key="index">
          <i class="el-icon-circle-close position" @click="Remove(index)"></i>
          <video
            :src="item"
            style="width: 100px; height: 100px"
            class="avatar video-avatar"
            controls="true"
          >
            您的浏览器不支持视频播放
          </video>
        </div>
      </template>

      <template v-if="imgArr.length != 0 && fileType == 2">
        <!-- <div
          class="item"
          v-for="(item, index) in imgArr"
          :key="index"
        >
          <i class="el-icon-circle-close position" @click="Remove(index)"></i>
          <video
            :src="item"
            style="width: 100px;height: 100px;"
            class="avatar video-avatar"
            controls="controls"
          >
            您的浏览器不支持视频播放
          </video>
        </div> -->
      </template>

      <el-progress
        v-show="percentFlag"
        type="circle"
        :width="100"
        :percentage="uploadPercent"
        style="margin-top: 7px"
      ></el-progress>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import {
// 	fileDelete
// } from '@/api/_type'

import { media } from '@/api/other'

const ENV = import.meta.env

export default {
  name: 'uploadFile',
  props: {
    modelValue: String,
    limit: {
      default: 1,
      type: Number
    },
    tipLabel: {
      default: '支持格式jpg、jpeg、png',
      type: String
    },
    // 上传类型
    fileType: {
      //0 图片 1视频 2文件
      default: 0,
      type: [Number, String]
    },
    type: {
      default: 0,
      type: [Number, String]
    },
    // 大小
    fileSize: {
      type: Number,
      default: () => 50
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 格式
    suffixStr: {
      type: [Array, String],
      default: () => ['jpg、jpeg、png', 'mp4、ogg、flv、avi、wmv、rmvb、mov', 'pdf、txt、doc、docx、excel、ppt']
    },
  },
  data () {
    return {
      icon: '',
      imgArr: [],
      nameArr: [],

      deleteUrl: ENV.VITE_BASE_URL + 'admin/file/delete',

      uploadPercent: 0,

      percentFlag: false,

      multiple: false,
      uploadUrl: ENV.VITE_BASE_URL + media
    }
  },
  emits: ['update:modelValue'],
  methods: {
    onError (err, file) {
      console.log(err, file)
      this.$message({
        message: '上传失败',
        type: 'danger'
      })

      this.percentFlag = false

      this.icon = ''

    },
    // 上传时
    onProgress (event, file) {
      this.icon = 'el-icon-loading'
      this.uploadPercent = Number(file.percentage.toFixed(2))
      this.percentFlag = true
      // console.log(this.uploadPercent, file.percentage);
    },
    // 上传前
    beforeUpload (file) {
      if (this.imgArr.length >= this.limit) {
        this.$message.warning('超出最大上传数量' + this.limit + '！')

        return false
      }

      let fileSize = this.fileSize

      console.log(file.size / 1024 / 1024)

      if (fileSize != '' && file.size / 1024 / 1024 >= fileSize) {
        this.$message({
          message: '文件大小不能超过' + this.fileSize + 'MB',
          type: 'warning'
        })
        return false
      }

      let last = this.fileType != 2 ? file.type.lastIndexOf('/') : file.name.lastIndexOf('.')
      let suffix = this.fileType != 2 ? file.type.substr(last + 1, file.type.length) : file.name.substr(last + 1, file.name.length)

      let suffixStr = typeof (this.suffixStr) == 'object' ? this.suffixStr[this.fileType] : this.suffixStr

      console.log(suffixStr, suffixStr.match(suffix))

      if (!suffixStr.match(suffix)) {
        this.$message.warning('只能上传' + suffixStr + '的文件')
        return false
      } else {
        // console.log('后缀名正确');
      }
    },
    // 上传成功
    handleSuccess (file) {
      if (file.code == 200) {

        // 关闭进度条
        this.uploadPercent = 100
        setTimeout(() => {
          this.percentFlag = false

          this.imgArr.push(file.data.url)

          this.nameArr.push(file.data.name)

          this.icon = ''

          this.uploadPercent = 0

          console.log('上传成功', this.imgArr.join(','))

          // 自定义事件返回给父组件
          this.$emit('update:modelValue', this.imgArr.join(','))
        }, 400)
      } else {
        this.$message.error('上传失败！')
      }
    },
    // 超出数量
    onExceed (fileList) {
      // console.log(this.$refs.upload.uploadFiles, this.imgArr);
      this.$message.warning('超出最大上传数量' + this.limit + '！')
    },
    // 文件删除
    onRemove (file, files, e) {
      let nameArr = this.imgArr.map(_ => {
        return _.substr(_.lastIndexOf('/') + 1, _.length)
      })
      this.imgArr.splice(nameArr.indexOf(file.name), 1)
      this.$emit('update:value', this.imgArr.join(','))

    },
    // 删除
    Remove (index) {
      // fileDelete(this.nameArr[index])
      // .then(res => {
      // console.log('删除文件', res);

      // if (res.code === 200) {
      this.imgArr.splice(index, 1)
      this.nameArr.splice(index, 1)
      this.$refs.upload.uploadFiles.splice(index, 1)

      // 自定义事件返回给父组件
      this.$emit('update:modelValue', this.imgArr.join(','))

      // console.log('删除', this.imgArr, this.$refs.upload.uploadFiles);

      this.$message.success('删除成功！')
      // } else {
      // this.$message.error('删除文件失败！')
      // }
      // })
    },
    flieEcho (url) {
      if (this.fileType != 2) return

      let name = url.substr(url.lastIndexOf('/') + 1, url.length)

      this.$nextTick(() => {
        this.$refs.upload.uploadFiles = reactive([{
          name: name,
          percentage: 100,
          status: "success",
        }])
      })
    },
    clearFiles () {
      // this.$refs.uploads.clearFiles();
    }
  },
  watch: {
    modelValue: {
      handler (val, oldVal) {
        // console.log('传过来的数据' + typeof val, val);
        if (typeof val === 'string' && val) {

          this.flieEcho(val)

          // 切割
          if (val != '') {
            this.imgArr = val.split(',')

            for (let i of this.imgArr) {
              this.flieEcho(i)
            }

          }
          // console.log('string转数组', this.imgArr);
        } else {
          this.imgArr = []
          if (this.imgArr.length == 0 && this.$refs.upload) {
            this.$refs.upload.uploadFiles = []
          }
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.jianyi {
  margin-left: 10px;
  font-size: 12px;
  color: #666;
}

.imgArr {
  display: flex;
  flex-wrap: wrap;
}

.upload-demo :deep() .el-upload__tip {
  margin: 10px 0;
}

.imgArr .item {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
}

.imgArr i {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
  width: 20px;
  height: 20px;
  border-bottom-left-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
