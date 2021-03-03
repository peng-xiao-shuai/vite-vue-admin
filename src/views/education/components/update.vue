<template>
  <el-drawer
    :title="currentFrom.id ? '修改' : '添加'"
    v-model="dialog"
    direction="rtl"
    ref="drawer"
    @close='close'
    >
    <el-form :model="currentFrom"
             :rules="rules"
             ref="menuFrom"
             label-width="140px"
             style="padding:0 20px">
      <el-form-item label="资料类型：" prop="type">
			  <el-select v-model="currentFrom.type" style="width:80%" placeholder="请选择类型">
          <el-option
            v-for="item in selectMenuList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="标题：" prop="title">
        <el-input v-model="currentFrom.title" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item label="预览图片：" prop="previewImage">
        <upload-file v-model:value='currentFrom.previewImage'></upload-file>
        <!-- <svg-icon style="margin-left: 8px" :icon-class="currentFrom.icon"></svg-icon> -->
      </el-form-item>

      <el-form-item label="内容：" prop="contentIntroduction">
        <el-input type="textarea" v-model="currentFrom.contentIntroduction" style="width:80%"></el-input>
      </el-form-item>

      <el-form-item label="星级评分：" prop="starRating">
        <div style="display:flex;align-items:center;">
          <el-rate v-model="currentFrom.starRating" :colors="[themeColor,themeColor,themeColor]"></el-rate>
        </div>
      </el-form-item>

      <el-form-item label="资料文件地址：" prop="url" >
        <upload-file v-model:value='currentFrom.url' :fileType='fileTypeFun(currentFrom.type)' :fileSize="['',600,'']" :tipLabel='tipLabelFun(currentFrom.type)'></upload-file>
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
    addMaterial,
    modifyMaterial
} from "/@/api/education/education";

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
      fileTypeFun(e){
        switch(e){
          case 0:
            return 1
          default:
            return 2
        }
      },
      tipLabelFun(e){
        switch(e){
          case 0:
            return '支持：mp4、ogg、flv、avi、wmv、rmvb、mov'
          default:
            return '支持：pdf、txt、doc、docx、excel、ppt'
        }
      },
      onSubmit(formName) {
        console.log(this.currentFrom);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.currentFrom.id) {
                modifyMaterial(this.currentFrom).then(response => {
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.$emit('update:dialog', false)

                });
              } else {
                addMaterial(this.currentFrom).then(response => {
                  this.$refs[formName].resetFields();
                  this.resetForm(formName);
                  this.$message({
                    message: '提交成功',
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
