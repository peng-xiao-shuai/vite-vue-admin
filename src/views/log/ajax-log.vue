<template>
  <div>
    <el-button type="danger" @click="handleNewError">触发一个错误</el-button>
    <p>此错误已经被记录在日志页面，并在页面右上"日志按钮"区域显示提示信息</p>
  </div>
</template>

<script>
import { logAjax } from '@/api/other'
export default {
  methods: {
    handleNewError () {
      logAjax()
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>