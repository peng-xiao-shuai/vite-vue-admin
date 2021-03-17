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
      ref="uploadForm"
      label-width="70px"
      style="padding: 0 20px"
      class="Dform"
    >
      <el-form-item label="书名" prop="name">
        <el-input v-model="currentFrom.name" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload-file v-model:value="currentFrom.image"></upload-file>
      </el-form-item>
      <el-form-item label="内容" prop="text">
        <el-input
          type="textarea"
          v-model="currentFrom.text"
          rows="7"
          style="width: 80%"
        ></el-input>
      </el-form-item>
      <el-form-item label="评分" prop="rate">
        <div class="a">
          <el-rate
            v-model="currentFrom.rate"
            :colors="[themeColor, themeColor, themeColor]"
          >
          </el-rate>
        </div>
      </el-form-item>
      <el-form-item label="推荐" prop="recommend">
        <el-switch
          v-model="currentFrom.recommend"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <el-form-item label="原价" prop="oldPrice">
        <el-input v-model="currentFrom.oldPrice" style="width: 80%"></el-input>
      </el-form-item>
      <el-form-item label="现价" prop="price">
        <el-input v-model="currentFrom.price" style="width: 80%"></el-input>
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

<script lang='ts'>
// import {
//     modifyEnterprise,
//     addEnterprise
// } from "/@/api/eps/enterprise";

import { defineComponent, ref, getCurrentInstance } from "vue";

const defaultMenu = {
  title: "",
  parentId: 0,
  name: "",
  icon: "",
  hidden: 0,
  sort: 0,
};
export default defineComponent({
  name: "MenuDetail",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    currentFrom: {
      type: Object,
      default: () => {},
    },
    selectMenuList: {
      type: Array,
      default: () => [],
    },
  },
  setup(prop, context) {
    let uploadForm = ref<any>(null);

    function close() {
      context.emit("update:dialog", false);
      context.emit("update:currentFrom", {
        forkliftCertificate: "true",
        passengerElevatorCertificate: "true",
      });
    }

    function onSubmit() {
      uploadForm.validate((valid: any) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if (this.currentFrom.id) {
              // modifyEnterprise(this.currentFrom).then(response => {
              this.$message({
                message: "修改成功",
                type: "success",
                duration: 1000,
              });
              context.emit("update:dialog", false);

              // })
            } else {
              addEnterprise(this.currentFrom).then((response) => {
                uploadForm.resetFields();
                this.resetForm(formName);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                context.emit("update:dialog", false);
              });
            }

            // 刷新父组件
            setTimeout(() => {
              context.emit("refresh");
            }, 200);
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    }

    function resetForm() {
      uploadForm.resetFields();
      context.emit("update:currentFrom", {
        forkliftCertificate: "true",
        passengerElevatorCertificate: "true",
      });
    }

    return {
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入前端名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        icon: [
          { required: true, message: "请输入前端图标", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  emits: ["update:currentFrom", "update:dialog", "refresh"],
});
</script>

<style>
.el-drawer__body {
  overflow: auto;
}
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>

<style scoped lang='scss'>
* :deep() .el-form-item {
  display: flex;
  align-items: center;
  .el-form-item__content {
    width: 100%;
    display: flex;
    margin: 0 !important;
  }
}
</style>
