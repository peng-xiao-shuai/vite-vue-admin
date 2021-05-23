<template>
  <el-drawer
    :title="currentFrom.id ? '修改' : '添加'"
    :model-value="dialog"
    direction="rtl"
    ref="drawer"
    @close="close"
  >
    <el-form
      :model="currentFrom"
      :rules="rules"
      ref="uploadForm"
      label-position="top"
      style="padding: 0 20px"
      class="Dform"
    >
      <el-form-item label="书名" prop="name">
        <el-input v-model="currentFrom.name"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <upload-file
          v-model:value="currentFrom.image"
          disabled
          tipLabel="当前仅为示例，请改成可上传地址"
        ></upload-file>
      </el-form-item>
      <el-form-item label="类型" prop="types">
        <el-select
          v-model="currentFrom.types"
          placeholder="请选择"
          style="width: 100%"
        >
          <el-option
            v-for="item in selectMenuList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="text">
        <el-input
          type="textarea"
          v-model="currentFrom.text"
          rows="7"
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
      <div class="grid grid-c-2">
        <el-form-item label="原价" prop="oldPrice">
          <el-input v-model="currentFrom.oldPrice"></el-input>
        </el-form-item>
        <el-form-item label="现价" prop="price">
          <el-input v-model="currentFrom.price"></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!currentFrom.id" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang='ts'>
// import {
//     modifyEnterprise,
//     addEnterprise
// } from "@/api/eps/enterprise";

import { defineComponent, ref, inject } from "vue";

const defaultMenu = {
  title: "",
  parentId: 0,
  name: "",
  icon: "",
  hidden: 0,
  sort: 0,
};
export default defineComponent({
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
  emits: ["update:currentFrom", "update:dialog", "refresh"],
  setup(props, context) {
    let messageBox = inject<any>("messageBox");
    let message = inject<any>("$message");
    let uploadForm = ref<any>({});

    function close() {
      context.emit("update:dialog", false);
      context.emit("update:currentFrom", {});
    }

    function onSubmit() {
      uploadForm.value.validate((valid: any) => {
        if (valid) {
          messageBox
            .confirm("是否提交数据", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
            .then(() => {
              if (props.currentFrom.id) {
                // modifyEnterprise(props.currentFrom).then(response => {
                message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                // })
              } else {
                // addEnterprise(props.currentFrom).then((response) => {
                setTimeout(() => {
                  message({
                    message: "提交成功",
                    type: "success",
                    duration: 1000,
                  });
                }, 200);
                // });
              }

              // 刷新父组件
              setTimeout(() => {
                // 正常情况下 不需要传props.currentFrom 直接在父组件刷新接口就行了
                context.emit("refresh", props.currentFrom);

                context.emit("update:dialog", false);
              }, 200);
            });
        } else {
          message({
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
      context.emit("update:currentFrom", {});
    }

    return {
      close,
      uploadForm,
      resetForm,
      onSubmit,
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
// * :deep() .el-form-item {
//   display: flex;
//   align-items: center;
//   .el-form-item__content {
//     width: 100%;
//     display: flex;
//     margin: 0 !important;
//   }
// }
</style>
