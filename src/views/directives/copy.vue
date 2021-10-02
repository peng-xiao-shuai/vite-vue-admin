<template>
  <el-card :shadow="defaultData.cardShadow">
    <view-name></view-name>

    <!-- 注意 -->
    <div class="tipBox warning" style="font-size: 15px">
      <p>复制成功后所执行的函数，为指令初始化时所绑定的函数</p>
      <p>例如：
        <span class="code">v-copy="[ inputs.text1, bol ? callback : callback1 ]</span>
         假设 <span class="code">bol</span> 为 <span class="code">true</span> 那么只会执行 <span class="code">callback</span>，
         就算 <span class="code">bol</span> 在之后变为 <span class="code">false</span> 也只会执行 <span class="code">callback</span></p>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">
          基础 &nbsp;
          <div style="font-size: 13px;color: var(--el-color-info);">v-copy="inputs.text"</div>
        </div>
        <el-input v-model="inputs.text" placeholder="">
          <template #append>
            <span v-copy="inputs.text">复制</span>
          </template>
        </el-input>
      </div>
      <div>
        <div class="tipBox">
          数组式 &nbsp;
          <div style="font-size: 13px;color: var(--el-color-info);">v-copy="[inputs.text]"</div>
        </div>
        <el-input v-model="inputs.text" placeholder="">
          <template #append>
            <span v-copy="[inputs.text]">复制</span>
          </template>
        </el-input>
      </div>

      <div>
        <div class="tipBox">
          数组式（自定义复制成功后执行的函数）
          <div style="font-size: 13px;color: var(--el-color-info);">v-copy="[inputs.text1, callback]"</div>
        </div>
        <el-input v-model="inputs.text1" placeholder="">
          <template #append>
            <span v-copy="[inputs.text1, inputs.text1 == '诗和远方' ? callback : callback1]">复制</span>
          </template>
        </el-input>
      </div>
    </div>
  </el-card>
</template>

<script lang='ts'>
import { defineComponent, ref, reactive, nextTick } from "vue";

import { ElMessage } from 'element-plus';
export default defineComponent({
  setup(props, { emit }) {
    const inputs = reactive({
      text: '风和自由',
      text1: '诗和远方',
    })
    const callback = () => {
      ElMessage.warning('复制成功！' + inputs.text1)
    }

    const callback1 = () => {
      ElMessage.warning('复制成功！callback1')
    }

    return {
      callback,
      callback1,
      inputs
    };
  },
});
</script>

<style scoped lang='scss'>
</style>