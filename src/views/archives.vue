<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="form.account"
              :counter="16"
              label="账号"
              required
              clearable
              @keyup.enter.native="userLogin"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
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
          <v-col cols="12" md="12" v-if="!login">
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
    <notifications></notifications>
  </div>
</template>

<script>
import { login, register } from '../api/myapi'

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
    test() {},
    userLogin() {
      login({
        account: this.form.account,
        password: this.form.password
      }).then(res => {
        if (res.result) {
          window.localStorage.setItem('token', res.token)
          this.$notify({
            title: 'Bingo',
            message: '登陆成功啦！',
            type: 'success'
          })
        }
      })
    },
    register() {}
  }
}
</script>
