<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name></view-name>
      <div class="icons">
        <!-- <div v-for="(item, index) in icons" :key="index">
          <i :class="[defaultData.iconfont, item.icon]"></i>
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
