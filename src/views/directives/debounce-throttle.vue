<template>
  <el-card :shadow="defaultData.cardShadow">
    <view-name></view-name>

    <h4 style="margin-bottom: 0;">防抖</h4>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">
          基础防抖（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-debounce="[msg]"</div>
        </div>
        <el-button type='primary' v-debounce="[msg]">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          立即执行（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-debounce="[msg, 1000, [], true]"</div>
        </div>
        <el-button type='primary' v-debounce="[msg, 1000, [], true]">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          带参（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-debounce="[msg, 300, ['风和自由']]"</div>
        </div>
        <el-button type='primary' v-debounce="[msg, 300, ['风和自由']]">点击触发</el-button>
      </div>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox">
          基础防抖（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$debounce(msg)"</div>
        </div>
        <el-button type='primary' @click="$debounce(msg)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          立即执行（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$debounce(msg, 1000), [], true)"</div>
        </div>
        <el-button type='primary' @click="$debounce(msg, 1000, [], true)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox">
          带参（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$debounce(msg, 300), ['风和自由'])"</div>
        </div>
        <el-button type='primary' @click="$debounce(msg, 300, ['风和自由'])">点击触发</el-button>
      </div>
    </div>

    <h4 style="margin-bottom: 0;">节流</h4>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox warning">
          基础节流（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-throttle="[msg]"</div>
        </div>
        <el-button type='warning' v-throttle="[msg]">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          立即执行（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-throttle="[msg, 2000, [], true]"</div>
        </div>
        <el-button type='warning' v-throttle="[msg, 2000, [], true]">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          带参（指令）
          <div style="font-size: 13px;color: var(--el-color-info);">v-throttle="[msg, 2000, ['风和自由']]"</div>
        </div>
        <el-button type='warning' v-throttle="[msg, 2000, ['风和自由']]">点击触发</el-button>
      </div>
    </div>

    <div class="grid grid-c-3">
      <div>
        <div class="tipBox warning">
          基础节流（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$throttle(msg)"</div>
        </div>
        <el-button type='warning' @click="$throttle(msg)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          立即执行（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$throttle(msg, 2000), [], true)"</div>
        </div>
        <el-button type='warning' @click="$throttle(msg, 2000, [], true)">点击触发</el-button>
      </div>

      <div>
        <div class="tipBox warning">
          带参（函数）
          <div style="font-size: 13px;color: var(--el-color-info);">@click="$throttle(msg, 2000), ['诗和远方', 'warning'])"</div>
        </div>
        <el-button type='warning' @click="$throttle(msg, 2000, ['诗和远方', 'warning'])">点击触发</el-button>
      </div>
    </div>
   
  </el-card>
</template>

<script setup lang='ts'>
import { getCurrentInstance,reactive } from "vue";

const { proxy } = getCurrentInstance() as any

const msg = (str:string = '触发',type:string = 'success')=>{
  proxy.$message[type](str)
}

</script>

<style scoped lang='scss'>
.tipBox{
  font-size: 15px !important;

  .code{
    border-radius: 5px;
    padding: 0 5px;
    color: #666;
    background: #ddd;
  }
}
</style>