<template>
  <div>
    <p>{{title}}</p>
    <p v-html="text"></p>
  </div>
</template>

<script>
import { getSingleBlog } from '../api/myapi'
const { Prism } = window

export default {
  name: 'edit',
  data() {
    return {
      text: '',
      title: '',
      prism: ''
    }
  },
  mounted() {
    getSingleBlog({
      params: {
        id: this.$route.params.id
      }
    }).then(res => {
      if (res.result) {
        this.text = res.data.content.replace('<pre class="', '<pre class="line-numbers ') // 加上line-numbers类，让prism的行数插件识别
        this.$nextTick(() => {
          Prism.highlightAll()
        })
        this.title = res.data.title
      }
    })
  }
}
</script>
<style lang='less' scoped>
</style>