<template>
  <div class="hello">
    这是home界面
  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'

axios.interceptors.request.use(config => {
  const token = window.sessionStorage.getItem('token')
  config.headers.common.Authorization = 'Bearer ' + token
  return config
})

export default {
  name: 'home',
  props: {
    msg: String
  },
  data() {
    return {
      data: '',
      getBtn: false,
      postBtn: false,
      form: {
        name: '',
        weight: '',
        height: '',
        date: '',
        info: ''
      },
      columns: [
        {
          title: '名字',
          key: 'name'
        },
        {
          title: '身高',
          key: 'height'
        },
        {
          title: '体重',
          key: 'height'
        },
        {
          title: '日期',
          key: 'date'
        },
        {
          title: '信息',
          key: 'info'
        }
      ],
      table: []
    }
  },
  methods: {
    getData() {
      this.getBtn = true
      axios.get('http://localhost:3000/data').then(res => {
        console.log(res)
        this.getBtn = false
        this.table = res.data.data
        this.$Message.success('请求成功')
      }).catch(() => {
        this.getBtn = false
      })
    },
    postData() {
      this.postBtn = true
      axios
        .post(
          'http://localhost:3000/postData',
          Qs.stringify({
            name: this.form.name,
            weight: this.form.weight,
            height: this.form.height,
            info: this.form.info,
            date: this.form.date
          })
        )
        .then(res => {
          this.postBtn = false
          this.$Message.success('添加成功')
          window.sessionStorage.setItem('token', res.data.token)
        })
        .catch(() => {
          this.getBtn = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
