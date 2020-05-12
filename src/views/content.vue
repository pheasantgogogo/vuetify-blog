<template>
  <div v-highlight style="display:flex">
    <v-row>
      <v-col cols="12" lg="6">
    <div class="tinymce-editor">
      <editor
        v-model="myValue"
        :init="init"
      >
      </editor>
    </div>
      </v-col>
      <v-col cols="12" lg="6">
    <div v-html="myValue"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/codesample' // 字数统计插件
import { getBlogList, postBlog } from '../api/myapi'

export default {
  name: 'blog-content',
  components: { Editor },
  data() {
    return {
      myValue: '',
      data: '',
      init: {
        language_url: `/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `/tinymce/skins/ui/oxide`,
        content_css: `/tinymce/skins/content/default/content.css`,
        height: window.innerHeight - 120,
        plugins: 'image media table lists wordcount codesample',
        toolbar:
          'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table codesample | removeformat',
        branding: true,
        menubar: false,
        images_upload_handler: (blobInfo, success) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      }
    }
  },
  methods: {
    saveBlog() {
      postBlog({
        content: this.myValue
      }).then(res => {
        console.log(res.data)
      })
    },
    getBlog() {
      getBlogList().then(res => {
        console.log(res.data)
        this.data = res.data.content
      })
    }
  },
  mounted() {
    tinymce.init({})
  }
}
</script>
<style lang='less' scoped>
</style>