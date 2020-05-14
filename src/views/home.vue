<template>
  <div class="hello" v-highlight>
    <ul>
      <li v-for="i in list" :key="i.id">
        <h3>{{i.title}}</h3>
        <div v-html="i.content"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getBlogList } from '../api/myapi'

export default {
  name: 'home',
  props: {
    msg: String
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
  },
  mounted() {
    getBlogList().then(res => {
      if (res.result) {
        this.list = res.data
      }
    })
  }
}
</script>
