<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="标题"
          outlined
          v-model="title"
          :rules="[rules.required]"
        ></v-text-field>
        <div class="tinymce-editor">
          <editor v-model="myValue" :init="init" id="editor"></editor>
        </div>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" top>
      {{ errorTip }}
      <v-btn color="red" text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
    <v-btn @click="getBlog">请求全部</v-btn>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue' // 测试
import 'tinymce/themes/silver'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/emoticons' // 插入上传图片插件
import 'tinymce/plugins/save' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/quickbars' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/preview' // 预览插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/codesample' // 字数统计插件
import { getBlogList, postBlog } from '../api/myapi'

export default {
  name: 'blog-content',
  components: { Editor },
  data() {
    return {
      snackbar: false,
      myValue: '',
      title: '',
      data: '',
      rules: {
        required: (value) => !!value || '请输入标题'
      },
      init: {
        language_url: `/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `/tinymce/skins/ui/oxide`,
        content_css: `/tinymce/skins/content/default/content.css`,
        height: window.innerHeight - 120,
        plugins:
          'image media table lists wordcount codesample preview emoticons save',
        toolbar:
          'preview save undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table codesample | emoticons removeformat',
        branding: true,
        menubar: false,
        save_enablewhendirty: false,
        images_upload_handler: (blobInfo, success) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        },
        save_onsavecallback: () => {
          if (!this.myValue || !this.title) {
            this.snackbar = true
          } else {
            postBlog({
              content: this.myValue,
              title: this.title
            }).then((res) => {
              if (res.result) {
                this.myValue = this.title = ''
              }
            })
          }
        },
        emoticons_database_url:
          process.env.NODE_ENV === 'production'
            ? 'https://wangluhong.cn/tinymce/plugins/emoticons/js/emojis.js'
            : 'http://localhost:8080/tinymce/plugins/emoticons/js/emojis.js'
      }
    }
  },
  methods: {
    saveBlog() {
      postBlog({
        content: this.myValue,
        title: this.title
      }).then((res) => {
        console.log(res.data)
      })
    },
    getBlog() {
      getBlogList().then((res) => {
        console.log(res.data)
        this.data = res.data.content
      })
    }
  },
  mounted() {
    tinymce.init({})
  },
  computed: {
    errorTip() {
      if (!this.title) {
        return '请输入标题'
      }
      if (!this.myValue) {
        return '请输入内容'
      }
      return ''
    }
  }
}
</script>
<style lang='less' scoped>
</style>