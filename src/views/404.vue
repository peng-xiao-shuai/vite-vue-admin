<template>
  <div>
    <div class="app-container">
      <el-col :span="12">
        <!-- <div style="background: var(--color-primary);"> -->
          <img :src="img_404" alt="404" class="img-style">
        <!-- </div> -->
      </el-col>
      <el-col :span="12">
        <div style="margin-left: 50px;margin-top: 40px">
          <h1 class="color-main">OOPS!</h1>
          <h2 style="color: var(--color-primary)">{{ t('Sorry,.it.got.lost.by.accident') }}</h2>
          <div style="color:#909399;font-size: 14px">{{ t('The.page.you.are.looking.for.was.moved.,removed.,renamed.or.might.never.existed') }}</div>
          <el-button style="margin-top: 20px" type="primary" round @click="handleGoMain">{{ t('back.home') }}</el-button>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import img_404 from '../assets/gif_404.gif';

  export default {
    name: '404',
    data() {
      return {
        img_404
      }
    },
    methods: {
      handleGoMain() {
        this.$router.push({path: '/'})
      }
    },
  }
</script>

<style scoped>
  .app-container {
    width: 65%;
    margin: 120px auto;
  }

  .img-style {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
