<template>
  <div class="grid">
    <div class="eachDiv eachDiv1">
      <panel-group :count="count" :height="90" />
      <el-card :shadow="defaultData.cardShadow">
        <!-- eachDiv 原有高度 - panel-group高度 - panel-group(margin) - card(padding) -->
        <HomeEcharts :isSlot="true" echartsId="chart" :height="550 - 90 - 20 - 40" :colors="colors"
          :information="chart.value" :title="t('user.login.line')" types="line">
          <template #default>
            <!-- 版块切换 -->
            <div class="typeSwitch">
              <div v-for="(item, index) in count" :key="'switch' + index"
                :class="[{ 'switch-active': current == index }, 'switch']" @click="typeSwitch(index)">
                {{ t(item.locale) }}
              </div>
            </div>
          </template>

          <template #lineColor>
            <!-- 线段颜色 -->
            <div class="lineColor">
              <div v-for="item in userLineColor.value" :key="item.color">
                <i :style="{ background: item.color }"></i>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </template>

          <template #timeSwiper>
            <!-- 时间段切换 -->
            <div class="timeDropdown">
              <el-dropdown @command="(e: string) => handleChart(current, e)">
                <span class="el-dropdown-link pointer">
                  {{ findTime
                  }}<el-icon class="el-icon--right">
                    <ArrowDown />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="Month">Month</el-dropdown-item>
                    <el-dropdown-item command="Fifteen">Fifteen</el-dropdown-item>
                    <el-dropdown-item command="Seven">Seven</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
        </HomeEcharts>
      </el-card>
    </div>

    <div class="eachDiv eachDiv2">
      <div class="moneyGrid">
        <el-card :shadow="defaultData.cardShadow" class="eachDiv">
          <!-- icon -->
          <div class="viteIconBg">
            <i :class="[defaultData.iconfont, 'vitehome-daymoney']"></i>
          </div>
          <!-- text -->
          <div class="text">
            <div class="money">￥{{ earnings.value.dayMoney }}</div>
            <span class="title">{{ t('day.income') }}</span>
          </div>
          <!-- 上升 -->
          <div class="increase">
            <el-icon style="color: var(--el-color-primary)">
              <Top />
            </el-icon>
          </div>
        </el-card>

        <el-card :shadow="defaultData.cardShadow" class="eachDiv">
          <!-- icon -->
          <div class="viteIconBg yellow">
            <i :class="[defaultData.iconfont, 'vitehome-zongshouyi']"></i>
          </div>
          <!-- text -->
          <div class="text">
            <div class="money">￥{{ earnings.value.totalMoney }}</div>
            <span class="title">{{ t('total.income') }}</span>
          </div>
          <!-- 上升 -->
          <div class="increase">
            <el-icon style="color: var(--el-color-primary)">
              <Top />
            </el-icon>
          </div>
        </el-card>

        <el-card :shadow="defaultData.cardShadow" :body-style="{ padding: '20px' }" class="eachDiv eachDiv-3">
          <HomeEcharts echartsId="earnings" :height="550 - 170 - 20 - 40" :colors="colors" :information="earnings.chart"
            types="line" :title="t('income.line')" />
        </el-card>
      </div>
    </div>
    <div class="eachDiv eachDiv3">
      <el-card :shadow="defaultData.cardShadow">
        <div class="echartsBox">
          <div class="un-handle-layout">
            <HomeEcharts echartsId="pageViewData" :height="310 - 40" :colors="colors" :information="pageViewData.value"
              types="homeCake" :title="t('page.view.pillar')" />
          </div>
        </div>
      </el-card>
    </div>
    <div class="eachDiv eachDiv4">
      <el-card :shadow="defaultData.cardShadow">
        <h3 style="
              margin: 0 0 10px 0;
              display: flex;
              justify-content: space-between;
            ">
          <span>{{ t('commit.list') }}</span>
        </h3>
        <powerful-table :isSelect="false" :isPagination="false" :list="list" :header="tableHeader" />
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup name="Home">
import { ArrowDown, Top } from '@element-plus/icons'
import HomeEcharts from '@/components/easy-echart/index.vue'
import PanelGroup from './components/PanelGroup.vue'
import 'vue3-number-roll-plus/main.css'
import { useEchart, useTableData } from './indexData'
const {
  colors,
  count,
  chart,
  userLineColor,
  current,
  earnings,
  findTime,
  pageViewData,
  handleChart,
} = useEchart()

const {
  list,
  tableHeader,
  handleGetTable
} = useTableData()

const typeSwitch = (i: number) => {
  current.value = i

  handleChart(i)
}
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 0.1fr 1fr;
  grid-template-rows: 550px 310px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .eachDiv1 {
    grid-column-start: 1;
    grid-column-end: 4;

    .typeSwitch {
      display: flex;
      border-radius: 12.5px;
      width: 350px;
      height: 25px;
      line-height: 25px;
      font-size: 14px;
      overflow: hidden;
      background: #eff1f4;

      >div {
        flex: 1;
        text-align: center;
        color: var(--el-text-color-regular);
        background: var(--el-fill-color);
      }

      .switch-active {
        background: var(--el-color-primary);
        color: #fff;
      }
    }

    .lineColor {
      display: flex;
      align-items: center;

      >div {
        margin-right: 10px;
        display: flex;
        align-items: center;
      }

      >div:last-child {
        margin: 0;
      }

      i {
        width: 15px;
        height: 15px;
        border-radius: 2px;
        margin-right: 5px;
        display: inline-block;
      }
    }

    .timeDropdown {
      width: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 25px;
      height: 25px;
      font-size: 14px;
      background: var(--el-fill-color);
    }
  }

  .eachDiv2 {
    grid-column-start: 4;
    grid-column-end: 5;
  }

  .eachDiv4 {
    grid-column-start: 2;
    grid-column-end: 5;

    :deep(.el-card) {
      height: 310px;

      >.el-card__body {
        height: 100%;
        box-sizing: border-box;
      }
    }
  }

  >.eachDiv {
    width: 100%;
    // background: #fff;

    .moneyGrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 170px auto;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      // height: 450px;

      .eachDiv-3 {
        grid-row-start: 2;
        grid-column-start: 1;
        grid-column-end: 3;
      }

      .eachDiv {
        width: 100%;
        box-sizing: border-box;

        :deep() .el-card {
          height: 100%;
          display: flex;
          align-content: center;
          box-sizing: border-box;

          .el-card__body {
            width: 100%;
            padding: 10px 0;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }

        .viteIconBg,
        .text,
        .increase {
          margin: 0 auto 6px;
          text-align: center;

          .money {
            color: var(--el-color-primary-dark-2);
            font-size: 22px;
            font-weight: bold;
          }

          .title {
            color: #aaa;
          }
        }

        .increase,
        .increase i {
          font-weight: bold;
        }

        .viteIconBg {
          width: 60px;
          height: 60px;
          background: linear-gradient(to top,
              var(--el-color-primary),
              var(--el-color-primary-light-7));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .yellow {
          background: linear-gradient(to top, #ffa30e, #ffdf76);
        }

        .viteIcon {
          color: #fff;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
