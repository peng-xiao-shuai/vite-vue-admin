<template>
  <div class="app-container">
    <el-card :shadow="defaultData.cardShadow">
      <view-name />

      <div>
        <el-form :inline="true" style="margin-bottom: 20px">
          <div class="screenForm">
            <el-form-item label="地址：" style="width: 380px">
              <el-input
                v-model="location.address"
                placeholder="请输入地址"
                style="width: 300px"
                clearable
                @change="geocoderFun(location.address)"
              />
            </el-form-item>
            <el-form-item label="经纬度：" prop="types">
              <div class="grid grid-c-2">
                <el-input
                  v-model="location.lng"
                  placeholder="请输入经度"
                  clearable
                  @change="geocoderFun(location)"
                />
                <el-input
                  v-model="location.lat"
                  placeholder="请输入纬度"
                  clearable
                  @change="geocoderFun(location)"
                />
              </div>
            </el-form-item>
          </div>
        </el-form>
        <div id="container" style="height: 500px; width: 100%"></div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
// 组件
import { useQQMap } from '@/hooks/useMap.js'
const { location, geocoderFun } = useQQMap()
</script>
