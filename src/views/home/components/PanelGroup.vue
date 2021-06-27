<template>
  <div style="margin-bottom: 20px">
    <div class="grid" :style="{ height: height + 'px' }">
      <template v-for="(i, n) in count" :key="i.value">
        <el-card
          :class="['card-panel', 'item' + n]"
          :shadow="defaultData.cardShadow"
          :body-style="{
            background: i.color,
            padding: '10px',
            height: height + 'px',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }"
        >
          <div :class="['icon-people', 'viteIcon', i.icon]"></div>
          <div class="warp">
            <div class="text">{{ t(i.locale) }}</div>
            <div class="num">{{ i.value || 0 }}</div>

            <!-- <digit-roll :start-val="0" :end-val="i.value || 0" :duration="1000" class="num" /> -->
          </div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    count: {
      type: Object,
      default: {},
    },
    height: {
      type: [Number, String],
      default: 50,
    },
  },
  components: {
    // CountTo
  },
});
</script>

<style lang="scss" scoped>
.viteIcon {
  font-size: 60px;
  color: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;

  .card-panel {
    font-size: 16px;
    // overflow: hidden;
    border-radius: 5px;
    :deep() .el-card .el-card__body {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .warp {
      min-width: 100px;
      text-align: center;
      color: #fff;

      .text {
        line-height: 18px;
        font-size: 16px;
        margin-bottom: 12px;
      }
      .num {
        font-size: 20px;
      }
    }
  }
}
</style>
