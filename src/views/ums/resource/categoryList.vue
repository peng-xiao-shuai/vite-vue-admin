<template>
  <div class="app-container">
    <el-card :style="{marginBottom: '20px'}" :shadow="defalutData.cardShadow">
      <div class="operate-container">
        <div>
          <i class="el-icon-tickets"></i>
          <span>数据列表</span>
        </div>

        <div>
          <el-button type="primary" class="btn-add" @click="handleAdd()" size="mini">
            添加
          </el-button>
        </div>
      </div>
    </el-card>

    <el-card :shadow="defalutData.cardShadow">
		<div>
		<powerful-table
			ref="menuTable"
			:list="list"
			:header="config"
			:isSelect="false"
			:total="total"
      :isPagination='false'
			:tableName="'menuTable'"
			@sizeChange="getList"
			@update="handleUpdate"
			@remove="handleDelete"
		>
		</powerful-table>
		</div>
    </el-card>
  <el-drawer
    :title="resourceCategory.id ? '修改' : '添加'"
    v-model="dialogVisible"
    direction="rtl"
    ref="drawer"
  >
    <el-form v-model="resourceCategory"
               ref="resourceCategoryForm"
               label-width="150px" size="small">
        <el-form-item label="名称：">
          <el-input v-model="resourceCategory.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="resourceCategory.sort" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleDialogConfirm('resourceCategoryForm')">提交</el-button>
          <el-button v-if="!resourceCategory.id" @click="resetForm('resourceCategoryForm')"
            >重置</el-button
          >
        </el-form-item>
    </el-form>
  </el-drawer>
  </div>
</template>
<script>
import {
  listAllCate,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory,
} from "/@/api/ums/resource";
// import {formatDate} from '@/utils/date';
import { category } from "./indexData";

const defaultResourceCategory = {
  name: null,
  sort: 0,
};
export default {
  name: "resourceCategoryList",
  data() {
    return {
      config: category,
      list: null,
      listLoading: false,
      dialogVisible: false,
      isEdit: false,
      resourceCategory: Object.assign({}, defaultResourceCategory),
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.resourceCategory = Object.assign({}, defaultResourceCategory);
    },
    handleUpdate(row,index) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.resourceCategory = Object.assign({}, row);
    },
    handleDelete(row,index) {
      this.$confirm("是否要删除该分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteResourceCategory(row.id).then((response) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        });
      });
    },
    handleDialogConfirm() {
      this.$confirm("是否要确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        if (this.isEdit) {
          updateResourceCategory(
            this.resourceCategory.id,
            this.resourceCategory
          ).then((response) => {
            this.$message({
              message: "修改成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        } else {
          createResourceCategory(this.resourceCategory).then((response) => {
            this.$message({
              message: "添加成功！",
              type: "success",
            });
            this.dialogVisible = false;
            this.getList();
          });
        }
      });
    },
    getList(e) {
      this.listLoading = true;

      // Object.assign(this.listQuery, e ? e : {});

      listAllCate({}).then((response) => {
        this.listLoading = false;
        this.list = response.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
};
</script>
<style>
</style>


