<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name></view-name>

      <iframe
        src="https://gitee.com/abc1612565136/vite-admin"
        frameborder="0"
        width="100%"
        height="600px"
      ></iframe>
    </el-card>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: "iframe-",
  setup () {
    // 判断是否用户是否翻墙
    function checkWebSiteOnline (config) {
      let img = new Image()
      img.onload = function () {
        if (typeof config.success == 'function') config.success(config.url)
      }
      img.onerror = function () {
        if (typeof config.error == 'function') config.error(config.url)
      }
      img.src = config.url + "&" + Math.random()
    }

    let href = ref('https://gitee.com/abc1612565136/vite-admin')
    let status = false

    //判断能否翻墙
    checkWebSiteOnline({
      url: 'https://avatars.githubusercontent.com/u/53845479?v=4',
      success: function (url) {
        console.log('加载成功')
        status = true
      },
      error: function (url) {
        console.log('加载失败')
        status = false
      }
    })

    setTimeout(() => {
      if (status) {
        href.value = 'https://github.com/Peng-Xiao-Shuai-0902/vite-vue-admin'
      } else {
        href.value = 'https://gitee.com/abc1612565136/vite-admin'
      }
    }, 1000)

    return {
      href
    }
  }
};
</script>

<style scoped lang='scss'>
</style>
