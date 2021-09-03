<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name></view-name>
      
      <div>
        <div>
          <el-form :inline="true" :model="currentFrom">
            <div class="screenForm">
              <el-form-item label="最大上传数量：">
                <el-input-number
                  v-model="currentFrom.limit"
                  placeholder="请输入最大上传数量"
                  style="width: 80%"
                  clearable
                ></el-input-number>
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
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="最大上传文件大小（MB）：">
                <el-input
                  v-model="currentFrom.fileSize"
                  placeholder="请输入最大上传文件大小"
                  style="width: 80%"
                  clearable
                ></el-input>
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
                ></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 20px">
          <upload-files-copy
            v-model="currentFrom.image"
            :fileSize:="currentFrom.fileSize"
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
          ></upload-files-copy>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang='ts'>
import { ref, reactive, defineComponent, inject } from "vue";
import uploadFilesCopy from "./components/upload-files-copy.vue";

export default defineComponent({
  components: {
    uploadFilesCopy,
  },
  setup() {
    let currentFrom = reactive({
      image: "http://www.aiiup.cn/uploads/20190821/1-1Z115223503326.jpg",
      limit: 1,
      fileType: 0,
      fileSize: 1,
      suffixStr: "jpg、jpeg、png",
      suffixArr: [
        {
          label: "图片",
          type: 0,
        },
        {
          label: "视频",
          type: 1,
        },
        {
          label: "文件",
          type: 2,
        },
      ],
    });
    return {
      // 变量
      currentFrom,
      // 方法
    };
  },
});
</script>

<style scoped>
</style>
