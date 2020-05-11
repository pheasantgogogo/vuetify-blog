<template>
<div>
  <pre>
    <code>
      const a = 1
      console.log(a)
      function bb(sb) {
        console.(sb)
      }
    </code>
  </pre>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init">
    </editor>
  </div>
  <Button @click="saveBlog">保存</Button>
  <Button @click="getBlog">请求</Button>
  <div v-html="data"></div>
</div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/codesample'// 字数统计插件
import axios from 'axios'
import qs from 'qs'

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
        height: 300,
        plugins: 'image media table lists wordcount codesample',
        toolbar: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table codesample | removeformat',
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
      axios.post('http://localhost:3000/postBlog',
        qs.stringify({
          content: this.myValue
        })).then(res => {
        console.log(res)
      })
    },
    getBlog() {
      axios.get('http://localhost:3000/getBlog').then(res => {
        this.data = res.data.data.content
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