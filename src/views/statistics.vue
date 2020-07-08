<template>
  <div>
    <v-dialog v-model="dialog1" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">添加角色</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>添加角色</v-card-title>
        <v-card-text>
          <v-text-field prepend-icon="mdi-account" label="角色名/职业" v-model="userName"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelAddUser">取消</v-btn>
          <v-btn color="primary" @click="confirmAddUser" :loading="loading1" :disabled="loading1">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="500" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">添加记录</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>添加记录</v-card-title>
        <v-card-text>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="date" label="日期" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-combobox
            :items="userList"
            item-text="name"
            item-value="id"
            label="角色"
            clearable
            v-model="userSelect"
            prepend-icon="mdi-account"
          ></v-combobox>
          <v-combobox
            :items="itemList"
            item-text="name"
            item-value="id"
            label="史诗"
            chips
            multiple
            clearable
            counter
            v-model="itemSelect"
          ></v-combobox>
          <v-text-field label="史诗灵魂" v-model.number="souls"></v-text-field>
          <v-text-field label="晶石" v-model.number="store"></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="cancelAddList">取消</v-btn>
          <v-btn color="primary" @click="confirmAddList" :loading="loading2" :disabled="loading2">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getItemList, addUser, getUserList } from '../api/myapi'

export default {
  name: 'statistics',
  data() {
    return {
      dialog1: false,
      dialog2: false,
      loading1: false,
      loading2: false,
      userName: '',
      itemList: [],
      userList: [],
      itemSelect: [],
      userSelect: '',
      menu: false,
      souls: 0,
      store: 0,
      date: new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    resetDate() {
      this.userSelect = ''
      this.itemSelect = []
      this.souls = this.store = 0
      this.date = new Date().toISOString().substr(0, 10)
      this.userName = ''
    },
    addUser() {},
    cancelAddUser() {
      this.dialog1 = false
      this.resetDate()
    },
    cancelAddList() {
      this.dialog2 = false
      this.resetDate()
    },
    confirmAddUser() {
      this.loading1 = true
      addUser({
        name: this.userName
      }).then(res => {
        this.loading1 = false
        this.dialog1 = false
        if (res.result) {
          this.resetDate()
        }
      })
    },
    confirmAddList() {
      this.loading2 = true
    }
  },
  mounted() {
    getItemList().then(res => {
      if (res.result) {
        this.itemList = res.data
      }
    })
    getUserList().then(res => {
      if (res.result) {
        this.userList = res.data
      }
    })
  }
}
</script>