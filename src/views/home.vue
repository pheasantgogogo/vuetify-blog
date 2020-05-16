<template>
  <div class="hello">
    <v-card v-for="i in list" :key="i.id">
      <v-card-title @click="$router.push({path:`/edit/${i.id}`})">{{i.title}}</v-card-title>
      <v-card-text v-html="i.content"></v-card-text>
    </v-card>
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
