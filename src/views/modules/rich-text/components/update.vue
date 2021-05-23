<template>
  <el-drawer
    :title="currentFrom.id ? '修改' : '添加'"
    v-model="dialog"
    direction="rtl"
    ref="drawer"
    @close="close"
  >
    <el-form
      :model="currentFrom"
      :rules="rules"
      ref="menuFrom"
      label-width="140px"
      style="padding: 0 20px"
    >
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="currentFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="所属行业：" prop="natureOfBusiness">
        <el-input v-model="currentFrom.natureOfBusiness"></el-input>
      </el-form-item>
      <el-form-item label="所属领域：" prop="field">
        <el-input v-model="currentFrom.field" style="width: 80%"></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>

      <!-- <div :style="{borderLeft: '3px solid '+themeColor,borderRadius: '2px',paddingLeft: '10px'}">
        建筑信息
      </div> -->

      <el-form-item label="建筑物名称：" prop="buildingName">
        <el-input
          v-model="currentFrom.buildingName"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="建筑层数：" prop="buildingFloors">
        <el-input
          v-model="currentFrom.buildingFloors"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="建筑高度：" prop="buildingHeightb">
        <el-input
          v-model="currentFrom.buildingHeightb"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="标准话建设情况：" prop="construction">
        <el-input
          v-model="currentFrom.construction"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="叉车是否有证：">
        <el-radio-group v-model="currentFrom.forkliftCertificate">
          <el-radio :label="'true'">是</el-radio>
          <el-radio :label="'false'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="叉车数量：" prop="forkliftNumber">
        <el-input
          v-model="currentFrom.forkliftNumber"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="乘客电梯是否有证：">
        <el-radio-group v-model="currentFrom.passengerElevatorCertificate">
          <el-radio :label="'true'">是</el-radio>
          <el-radio :label="'false'">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="乘客电梯数量：" prop="passengerElevatorNumber">
        <el-input
          v-model="currentFrom.passengerElevatorNumber"
          style="width: 80%"
        ></el-input>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>
      <el-form-item label="结构形式：">
        <el-input v-model="currentFrom.structuralStyle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!currentFrom.id" @click="resetForm('menuFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import {
  modifyEnterprise,
  addEnterprise
} from "@/api/eps/enterprise"

const defaultMenu = {
  title: '',
  parentId: 0,
  name: '',
  icon: '',
  hidden: 0,
  sort: 0
}
export default {
  name: "MenuDetail",
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    currentFrom: {
      type: Object,
      default: () => { }
    },
    selectMenuList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入前端名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入前端图标', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  emits: ['update:currentFrom', 'update:dialog', 'refresh'],
  methods: {
    close () {
      this.$emit('update:dialog', false)
      this.$emit('update:currentFrom', { forkliftCertificate: 'true', passengerElevatorCertificate: 'true' })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.currentFrom.id) {
              modifyEnterprise(this.currentFrom).then(response => {
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                })
                this.$emit('update:dialog', false)

              })
            } else {
              addEnterprise(this.currentFrom).then(response => {
                this.$refs[formName].resetFields()
                this.resetForm(formName)
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                })
                this.$emit('update:dialog', false)
              })
            }

            // 刷新父组件
            setTimeout(() => {
              this.$emit('refresh')
            }, 200)
          })

        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:currentFrom', { forkliftCertificate: 'true', passengerElevatorCertificate: 'true' })
    },
  }
}
</script>

<style>
/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
.el-drawer__body {
  overflow: auto;
  /* overflow-x: auto; */
}

/*2.隐藏滚动条，太丑了*/
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>
