<template>
  <div>
    {{ buttonData }}
    <el-tag
      :key="tag"
      v-for="(tag, index) in tags"
      closable
      :disable-transitions="false"
      @close="handleClose(tag, index)"
    >
      {{ keyName ? tag[keyName] : tag }}
    </el-tag>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
      v-else
      class="button-new-tag"
      :style="(buttonData && buttonData.style) || {}"
      @click="showInput"
      >{{ (buttonData && buttonData.text) || "+ 新增" }}</el-button
    >
  </div>
</template>

<script>
export default {
  props: {
    modelValue: [String, Array],
    keyName: String,
    buttonData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      tags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  emits: ['update:value'],
  watch: {
    value: {
      immediate: true,
      handler (val) {
        console.log(val)
        if (typeof val === 'string') {
          this.tags = val.split(',')
        } else {
          this.tags = val
        }
      }
    }
  },
  methods: {
    handleClose (tag, index) {
      this.tags.splice(index, 1)
      this.$emit('update:value', this.tags)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        let item = this.keyName ? {} : inputValue
        if (this.keyName) item[this.keyName] = inputValue

        this.tags.push(item)
        this.$emit('update:value', this.tags)
      }
      // this.inputVisible = true
      this.inputValue = ''
    }
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>