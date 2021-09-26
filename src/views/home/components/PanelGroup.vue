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
          }"
        >
          <div class="warp">
            <div class="text">{{ t(i.locale) }}</div>
            <VueNumberRollPlus class="num" :number='i.value || 0' isSemicolon background='rgba(0,0,0,0)'/>
            <!-- <digit-roll :start-val="0" :end-val="i.value || 0" :duration="1000" class="num" /> -->
          </div>
          <div :class="['icon-people', defaultData.iconfont, i.icon]"></div>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import VueNumberRollPlus from "vue3-number-roll-plus"

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
    VueNumberRollPlus
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
    height: 100%;
    // overflow: hidden;
    border-radius: 5px;
    position: relative;
    border: none;

    .icon-people{
      position: absolute;
      bottom: -8px;
      right: -8px;
      opacity: 0.3;
      transform: rotate(-25deg);
      transition: all .2s;
    }

    .warp {
      min-width: 100px;
      // text-align: center;
      color: #fff;

      .text {
        line-height: 18px;
        font-size: 16px;
        margin-bottom: 12px;
      }
      .num > :deep(.real-time-num[data-v-61ea3133]) {
        font-size: 20px;
        width: 14px;
        margin: 0;
      }
    }
  }

  .card-panel:hover .icon-people{
      bottom: 0;
      right: 0;
    }

}
</style>
