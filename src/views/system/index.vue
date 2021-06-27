<template>
  <el-card :shadow="defaultData.cardShadow">
    <el-form
      :model="systemSetting"
      ref="orderSettingForm"
      :rules="rules"
      label-width="200px"
    >
      <div class="tip" style="margin-top: 10px">系统设置栏</div>
      <el-form-item label="系统名字：" prop="systemName">
        <el-input
          v-model="systemSetting.systemName"
          class="input-width"
        ></el-input>
      </el-form-item>
      <!-- <div class="tip" style="margin-top: 10px">微信商户设置栏</div>
      <el-form-item label="微信商户号：" prop="weChatMchId">
        <el-input
          v-model="systemSetting.weChatMchId"
          class="input-width"
          :disabled="isDisabled2"
        ></el-input>
        <el-button @click="updateStatus('2')" type="primary"  
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="微信商户支付秘钥：" prop="weChatMchKey">
        <el-input
          v-model="systemSetting.weChatMchKey"
          class="input-width"
          :disabled="isDisabled3"
        ></el-input>
        <el-button @click="updateStatus('3')" type="primary"  
          >修改</el-button
        >
      </el-form-item> -->
      <div class="tip" style="margin-top: 10px">阿里云短信设置栏</div>
      <el-form-item label="阿里云短信签名：" prop="weChatMchId">
        <el-input
          v-model="systemSetting.smSignName"
          class="input-width"
          :disabled="isDisabled1"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('1')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="阿里云短信模板id：" prop="weChatMchKey">
        <el-input
          v-model="systemSetting.smTemplateId"
          class="input-width"
          :disabled="isDisabled2"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('2')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="阿里云accessKeyId：" prop="weChatMchId">
        <el-input
          v-model="systemSetting.accessKeyId"
          class="input-width"
          :disabled="isDisabled3"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('3')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="阿里云accessKeySecret：" prop="weChatMchKey">
        <el-input
          v-model="systemSetting.accessKeySecret"
          class="input-width"
          :disabled="isDisabled4"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('4')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <div class="tip" style="margin-top: 10px">微信小程序设置栏</div>
      <el-form-item label="微信AppId：" prop="weChatAppId">
        <el-input
          v-model="systemSetting.weChatAppId"
          class="input-width"
          :disabled="isDisabled5"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('5')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <el-form-item label="微信secret：" prop="weChatSecret">
        <el-input
          v-model="systemSetting.weChatSecret"
          class="input-width"
          :disabled="isDisabled6"
        ></el-input>
        <el-button
          style="margin-left: 20px"
          @click="updateStatus('6')"
          type="primary"
          >修改</el-button
        >
      </el-form-item>
      <div class="tip" style="margin-top: 10px">公司信息设置栏</div>
      <el-form-item label="公司地址：">
        <el-input
          v-model="systemSetting.companyAddress"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司地址：">
        <el-input
          v-model="systemSetting.servicePhone"
          class="input-width"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司简介：">
        <el-input
          v-model="systemSetting.introduction"
          type="textarea"
          class="input-width text-area"
          clearable
          :rows="row"
          @input="handleInputChange"
        ></el-input>
        <span class="remain-word">{{ textAreaVal }}/{{ maxLength }}</span>
      </el-form-item>
      <!-- <el-form-item label="客服电话：">
        <el-input v-model="systemSetting.servicePhone" class="input-width"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="订单完成超过：" prop="commentOvertime">
        <el-input v-model="systemSetting.commentOvertime" class="input-width">
          <template#append>
            天
          </template#append>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item label="快递第三方类型：" prop="courierType">
        <el-input v-model="systemSetting.courierType" class="input-width"></el-input>
        <span class="note-margin">快递查询第三方类型，不启用传none</span>
      </el-form-item> -->
      <el-form-item
        ><el-button @click="confirm('orderSettingForm')" type="primary"
          >提交</el-button
        ></el-form-item
      >
    </el-form>
  </el-card>
</template>
<script>
import { getSettings, setSetting } from "@/api/system/config"
const defaultOrderSetting = {
  courierType: "",
  systemName: "",
  expeditedPrice: "",
  expeditedTime: "",
  weChatAppId: "",
  weChatMchId: "",
  weChatMchKey: "",
  weChatSecret: "",
  commentOvertime: 0,
  introduction: 0,
  servicePhone: 0,
  answerTotalCount: 0,
  id: 0,
  companyAddress: "",
}
const checkTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("时间不能为空"))
  }
  let intValue = parseInt(value)
  if (!Number.isInteger(intValue)) {
    return callback(new Error("请输入数字值"))
  }
  callback()
}
const isEmpty = (str) => {
  if (str === "" || str === undefined || str === null) {
    return true
  }
  return false
}
export default {
  name: "config",
  data () {
    return {
      textAreaVal: 0,
      row: 10,
      maxLength: 200,
      isDisabled1: true,
      isDisabled2: true,
      isDisabled3: true,
      isDisabled4: true,
      isDisabled5: true,
      isDisabled6: true,
      systemSetting: Object.assign({}, defaultOrderSetting),
      rules: {
        answerTotalCount: { validator: checkTime, trigger: "blur" },
        companyAddress: { validator: checkTime, trigger: "blur" },
        introduction: { validator: checkTime, trigger: "blur" },
        servicePhone: { validator: checkTime, trigger: "blur" },
        commentOvertime: { validator: checkTime, trigger: "blur" },
        courierType: { required: true, message: "请填写信息", trigger: "blur" },
        systemName: { required: true, message: "请填写信息", trigger: "blur" },
        weChatAppId: { required: true, message: "请填写信息", trigger: "blur" },
        weChatMchId: { required: true, message: "请填写信息", trigger: "blur" },
        weChatMchKey: {
          required: true,
          message: "请填写信息",
          trigger: "blur",
        },
        weChatSecret: {
          required: true,
          message: "请填写信息",
          trigger: "blur",
        },
      },
    }
  },
  computed: {
    // 计算当前文本框中内容的字数
    valueLength () {
      console.log()
      if (isEmpty(this.textAreaVal)) {
        return 0
      }
      return this.textAreaVal.length
    },
  },
  created () {
    this.getDetail()
  },
  methods: {
    // 计算textAreaVal值，超过最大值则直接截断
    handleInputChange () {
      this.textAreaVal = this.systemSetting.introduction.length
      this.systemSetting.introduction = this.systemSetting.introduction.substring(
        0,
        this.maxLength
      )
      this.$emit("change", this.systemSetting.introduction)
    },
    updateStatus (type) {
      switch (type) {
        case "1":
          this.isDisabled1 = !this.isDisabled1
          break
        case "2":
          this.isDisabled2 = !this.isDisabled2
          break
        case "3":
          this.isDisabled3 = !this.isDisabled3
          break
        case "4":
          this.isDisabled4 = !this.isDisabled4
          break
        case "5":
          this.isDisabled5 = !this.isDisabled5
          break
        case "6":
          this.isDisabled6 = !this.isDisabled6
          break
        default:
          break
      }
    },
    confirm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否要提交修改?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            setSetting(this.systemSetting).then((response) => {
              this.$message({
                type: "success",
                message: "提交成功!",
                duration: 1000,
              })
            })
          })
        } else {
          this.$message({
            message: "请完善系统数据信息",
            type: "warning",
          })
          return false
        }
      })
    },
    getDetail () {
      getSettings().then((response) => {
        this.systemSetting = response.data
      })
    },
  },
};
</script>
<style scoped>
.system {
  width: 70%;
  margin: 0 auto;
  min-width: 900px;
  margin: 20px auto;
  padding: 10px;
}
.input-width {
  width: 80%;
}

.note-margin {
  margin-left: 15px;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 60%;
}
</style>
