<template>
  <div>
    <el-button type="danger" @click="handleNewError">触发一个错误</el-button>
    <p>此错误已经被记录在日志页面，并在页面右上"日志按钮"区域显示提示信息</p>
  </div>
</template>

<script>
export default {
  methods: {
    handleNewError () {
      console.log(a)
    }
  }
}
</script>