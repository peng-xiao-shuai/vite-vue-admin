<template>
  <el-drawer
    :title="'修改'"
    v-model="dialog"
    direction="rtl"
    ref="drawer"
    @close='close'
    >
    <el-form :model="currentFrom"
             :rules="rules"
             ref="menuFrom"
             label-width="60px"
             style="padding:0 20px">

      <el-form-item label="昵称：" prop="nickname">
        <el-input v-model="currentFrom.nickname" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item label="头像：" prop="icon">
        <el-input rows="10" type="textarea" v-model="currentFrom.icon" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item label="电话：" prop="phone">
        <el-input v-model="currentFrom.phone" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        <el-input v-model="currentFrom.gender" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('menuFrom')">提交</el-button>
        <el-button v-if="!currentFrom.id" @click="resetForm('menuFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script>
import {
    updateUser,
} from "/@/api/users/user";

  const defaultMenu = {
    // title: '',
    // parentId: 0,
    // name: '',
    // icon: '',
    // hidden: 0,
    // sort: 0
  };
  export default {
    name: "MenuDetail",
    props: {
      dialog: {
        type: Boolean,
        default: false
      },
      currentFrom:{
        type: Object,
        default:()=>{}
      },
      selectMenuList:{
        type: Array,
        default:()=>[]
      },
    },
    data() {
      return {
        rules: {
          type: [
            {required: true, message: '请选择类型', trigger: 'blur'},
          ],
        }
      }
    },
    emits:['update:currentFrom','update:dialog','refresh'],
    methods: {
      close(){
        this.$emit('update:dialog', false)
        this.$emit('update:currentFrom', {})
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.currentFrom.id) {
                updateUser(this.currentFrom).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$emit('update:dialog', false)

                });
              }

              // 刷新父组件
              setTimeout(()=>{
                this.$emit('refresh')
              },200)
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration: 1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.$emit('update:currentFrom', {})
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
.el-drawer__container ::-webkit-scrollbar{
    display: none;
}
</style>
