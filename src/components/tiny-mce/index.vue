<template>
  <div class="tinymce-editor">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div @click="getContentFun" :style="slotStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick, watchEffect } from "vue"
import axios from 'axios'
export default defineComponent({
  emits: ['update:modelValue'],
  props: {
    //传入的默认值
    modelValue: {
      type: String,
      default: ''
    },
    // 插槽外层div样式
    slotStyle: {
      type: Object,
      default: () => { }
    },
    height: {
      type: [String, Number],
      default: 500
    },
    width: {
      type: [String, Number],
      default: 500
    },
    //插件
    plugins: {
      type: [String, Array],
      default: 'lists fullscreen emoticons autosave image table wordcount emoticons'
    },
    //工具
    toolbar: {
      type: [String, Array],
      //如果显示的内容和配置的不符，表明插件未引入。需要去引入插件；
      default: 'bold italic underline strikethrough restoredraft image fullscreen emoticons | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | removeformat'
    },
    url: {
      required: true,
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => {
        return [{
          key: 'type',
          value: 0
        }]
      },
    }
  },
  setup (props, context) {
    onMounted(() => {
      init(props.height)
    })

    let plugins = props.plugins
    let toolbar = props.toolbar
    let hasInit = ref(false)
    let tinymceId = 'vue-tinymce-' + +new Date()

    watchEffect(() => {
      if (hasInit.value && props.modelValue != '') {
        nextTick(() => {
          window.tinymce.get(tinymceId).setContent(props.modelValue)
        })
        // context.emit("update:modelValue", window.tinymce.get(tinymceId).getContent())
      }
    })

    function getContentFun () {
      context.emit('update:modelValue', window.tinymce.get(tinymceId).getContent())
    }

    function init () {
      window.tinymce.init({
        selector: `#${tinymceId}`,
        branding: false, // 去水印
        language_url: '/static/zh_CN.js',  //语言包路径地址
        language: 'zh_CN',
        height: props.height,//编辑器高度
        width: props.width,//编辑器宽度
        plugins,  // 插件
        toolbar,  // 工具栏
        // menubar:false,//顶部菜单是否显示
        content_style: 'div,p{margin:5px 0;}' + 'img{max-width:100%;}' + '*::-webkit-scrollbar{width:6px;height:6px;background:transparent;}' + '*::-webkit-scrollbar-thumb{border-radius: 3px;background: #bac3d9;}',
        // 此处为图片上传处理函数，这里就没用base64的图片形式上传图片
        // 因为base64存储到服务器数据库太庞大了
        images_upload_handler: (blobInfo, success, failure) => {
          // 自定义上传逻辑
          let formdata = new FormData()
          formdata.append("file", blobInfo.blob(), blobInfo.filename())
          props.data.forEach((item) => {
            formdata.append(item.key, item.value)
          })
          // 改为自己接口路径
          axios.post(props.url, formdata)
            .then(res => {
              // 我的接口返回数据格式
              //{code: 0,data: {url: ....},message: ""}
              if (res.data.code === 200) {
                success(res.data.data.url)
              } else {
                failure('上传失败')
              }
            })
        },
        init_instance_callback: function (editor) {
          hasInit.value = true
          // 富文本初始化回调
        }
      })
    }
    return {
      tinymceId,
      hasInit,
      getContentFun,
    }
  },

})
</script>

<style lang="scss" scoped>
</style>