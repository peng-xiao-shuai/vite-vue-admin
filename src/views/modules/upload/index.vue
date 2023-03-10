<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name />

      <div>
        <el-form :inline="true" :model="currentFrom">
          <div class="screenForm">
            <el-form-item label="最大上传数量：">
              <el-input-number
                v-model="currentFrom.limit"
                placeholder="请输入最大上传数量"
                style="width: 80%"
                clearable
              />
            </el-form-item>
            <el-form-item label="上传类型：">
              <el-select
                v-model="currentFrom.fileType"
                placeholder="请选择"
                style="width: 80%"
              >
                <el-option
                  v-for="item in currentFrom.suffixArr"
                  :key="item.type"
                  :label="item.label"
                  :value="item.type"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="最大上传文件大小（MB）：">
              <el-input
                v-model="currentFrom.fileSize"
                placeholder="请输入最大上传文件大小"
                style="width: 80%"
                clearable
              />
            </el-form-item>
            <el-form-item
              :label="
                '上传' +
                currentFrom.suffixArr[currentFrom.fileType].label +
                '类型（、）隔开：'
              "
            >
              <el-input
                v-model="currentFrom.suffixStr"
                :placeholder="
                  '请输入上传' +
                  currentFrom.suffixArr[currentFrom.fileType].label +
                  '格式'
                "
                style="width: 80%"
                clearable
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="_flex">
        <div style="flex: 1; margin-right: 20px">
          <div class="tipBox">基础使用</div>
          <upload-file
            v-model="currentFrom.image"
            :limit="currentFrom.limit"
            :fileType="currentFrom.fileType"
            :fileSize="currentFrom.fileSize"
            :suffixStr="currentFrom.suffixStr"
            :tipLabel="
              '最大上传数量为' +
              currentFrom.limit +
              '，只能上传' +
              currentFrom.suffixStr +
              '，且文件大小不超过' +
              currentFrom.fileSize
            "
          />
        </div>

        <div style="flex: 1">
          <div class="tipBox">插槽使用</div>
          <upload-file
            ref="uploadFileRef"
            v-model="currentFrom.image"
            :limit="currentFrom.limit"
            :fileType="currentFrom.fileType"
            :fileSize="currentFrom.fileSize"
            :suffixStr="currentFrom.suffixStr"
            :tipLabel="
              '最大上传数量为' +
              currentFrom.limit +
              '，只能上传' +
              currentFrom.suffixStr +
              '，且文件大小不超过' +
              currentFrom.fileSize
            "
          >
            <template #default>
              <el-button type="primary">上传</el-button>
            </template>
            <template #file="{ file }">
              <div>
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <div class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-delete"
                    @click="uploadFileRef?.handleRemove(file)"
                  >
                    <el-icon><Delete /></el-icon>
                  </span>
                </div>
              </div>
            </template>
          </upload-file>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, nextTick } from 'vue'
import uploadFile from '@/components/upload-file/index.vue'
import { Delete } from '@element-plus/icons'

let currentFrom = reactive({
  image: [
    {
      url: 'http://www.aiiup.cn/uploads/20190821/1-1Z115223503326.jpg',
      name: '1-1Z115223503326.jpg',
    },
  ],
  limit: 1,
  fileType: 0,
  fileSize: 1,
  suffixStr: 'jpg、jpeg、png',
  suffixArr: [
    {
      label: '图片',
      type: 0,
    },
    {
      label: '视频',
      type: 1,
    },
    {
      label: '文件',
      type: 2,
    },
  ],
})
const uploadFileRef = ref<InstanceType<typeof uploadFile> | null>(null)
nextTick(() => {
  console.log(uploadFileRef.value)
})
</script>

<style scoped></style>
