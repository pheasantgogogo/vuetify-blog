<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="form.account"
              :counter="16"
              label="账号"
              required
              clearable
              @keyup.enter.native="userLogin"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="form.password"
              :counter="16"
              label="密码"
              required
              clearable
              type="password"
              @keyup.enter.native="userLogin"
            ></v-text-field>
          </v-col>
           <v-col
            cols="12"
            md="12"
            v-if="!login"
          >
            <v-text-field
              v-model="form.confirmPassword"
              :counter="16"
              label="确认密码"
              required
              clearable
              type="password"
            ></v-text-field>
          </v-col>
          <v-btn color="primary" @click="userLogin" v-if="login">登陆</v-btn>
          <v-btn color="primary" @click="login = !login" v-if="login">注册</v-btn>
          <v-btn @click="login = !login" v-if="!login" color="primary">返回登录</v-btn>
          <v-btn v-if="!login" @click="register" color="primary">确认注册</v-btn>
        </v-row>
      </v-container>
    </v-form>
    <v-btn @click="test">测试测试</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'archives',
  data() {
    return {
      snackbar: false,
      valid: false,
      login: true,
      form: {
        account: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    test() {
    },
    userLogin() {
      axios
        .post('http://localhost:3000/login', {
          account: this.form.account,
          password: this.form.password
        })
        .then(res => {
          if (res.data.result) {
            window.sessionStorage.setItem('token', res.data.token)
            this.$router.push({ path: '/user' })
          } else {
            this.$Message.error(res.data.reason)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    register() {
      if (this.form.password === this.form.confirmPassword) {
        axios.post('http://localhost:3000/register', {
          account: this.form.account,
          password: this.form.password
        }).then(res => {
          if (res.data.result) {
            this.$Message.success('注册成功')
            this.login = true
            this.form.account = this.form.password = this.form.confirmPassword = ''
          } else {
            this.$Message.error(res.data.reason)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$Message.error('两次密码不正确')
      }
    }
  }
}
</script>
