<template>
  <div class="app-container">
    <el-card :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="viteIcon vitelianjie" style="margin-right: 5px"></i>
          <span>外联</span>
        </div>
      </div>
      <div class="icons">
        <!-- <div v-for="(item, index) in icons" :key="index">
          <i :class="['viteIcon', item.icon]"></i>
          <div class="iconName">{{ item.name }}</div>
        </div> -->
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "interlink",
};
</script>

<style scoped lang='scss'>
</style>
