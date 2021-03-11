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
      ref="From"
      label-width="100px"
      style="padding: 0 20px"
    >
      <el-form-item label="资源名称：">
        <el-input v-model="currentFrom.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="资源路径：">
        <el-input v-model="currentFrom.url" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="资源分类：">
        <el-select
          v-model="currentFrom.categoryId"
          placeholder="全部"
          clearable
          style="width: 250px"
        >
          <el-option
            v-for="item in selectMenuList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：">
        <el-input
          v-model="currentFrom.description"
          type="textarea"
          :rows="5"
          style="width: 250px"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('From')">提交</el-button>
        <el-button v-if="!currentFrom.id" @click="resetForm('From')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import { updateResource, createResource } from "/@/api/ums/resource"

export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    currentFrom: {
      type: Object,
      default: () => { },
    },
    selectMenuList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {}
  },
  emits: ["update:currentFrom", "update:dialog", "refresh"],
  methods: {
    close () {
      this.$emit("update:dialog", false)
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            let isUpdate = this.currentFrom.id ? true : false

            if (isUpdate) {
              updateResource(this.currentFrom.id, this.currentFrom).then(
                (response) => {
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 1000,
                  })
                  this.$emit("update:dialog", false)
                }
              )
            } else {
              createResource(this.currentFrom).then((response) => {
                this.$refs[formName].resetFields()
                this.resetForm(formName)
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                })
                this.$emit("update:dialog", false)
              })
            }

            // 刷新父组件
            // 防止父组件返回过快没有刷新
            setTimeout(() => {
              this.$emit("refresh")
            }, 200)
          })
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit("update:currentFrom", { id: null })
    },
  },
};
</script>

<style scoped>
</style>
