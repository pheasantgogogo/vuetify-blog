<template>
  <div>
    <div style="display:inline-block;margin-right:15px">
      <v-dialog v-model="dialog1" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">添加角色</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>添加角色</v-card-title>
          <v-card-text>
            <v-text-field
              prepend-icon="mdi-account"
              label="角色名/职业"
              v-model="userName"
              :rules="[rules.required]"
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cancelAddUser">取消</v-btn>
            <v-btn
              color="primary"
              @click="confirmAddUser"
              :loading="loading1"
              :disabled="loading1 || !userName"
            >确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div style="display:inline-block">
      <v-dialog v-model="dialog2" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">添加记录</v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>添加记录</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
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
                  <v-text-field
                    v-model="date"
                    label="日期"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
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
                :rules="[rules.required]"
                clearable
                v-model="userSelect"
                prepend-icon="mdi-account"
              ></v-combobox>
              <v-text-field
                label="次数"
                v-model.number="counter"
                prepend-icon="mdi-arrange-bring-forward"
                :hint="`共${counter * 8}点疲劳值`"
                persistent-hint
                type="number"
                min="0"
                :rules="[rules.required, rules.counter]"
              ></v-text-field>
              <v-combobox
                :items="itemList"
                item-text="name"
                item-value="id"
                label="深渊"
                chips
                multiple
                clearable
                :hint="`共${itemSelect.length}件史诗`"
                persistent-hint
                v-model="itemSelect"
                prepend-icon="mdi-creation"
                ref="itemSelect"
                @change="$refs.itemSelect.lazySearch = ''"
              ></v-combobox>
              <v-combobox
                :items="itemList"
                item-text="name"
                item-value="id"
                label="2+2"
                chips
                multiple
                clearable
                :hint="`共${twotwo.length}件史诗`"
                persistent-hint
                v-model="twotwo"
                prepend-icon="mdi-creation"
                ref="twotwoSelect"
                @change="$refs.twotwoSelect.lazySearch = ''"
              ></v-combobox>
              <v-text-field
                label="史诗灵魂"
                v-model.number="souls"
                prepend-icon="mdi-eye-circle-outline"
                type="number"
                min="0"
                :rules="[rules.required, rules.souls]"
              ></v-text-field>
              <v-text-field
                label="晶石"
                v-model.number="store"
                prepend-icon="mdi-diamond"
                type="number"
                min="0"
                :rules="[rules.required, rules.store]"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="cancelAddList">取消</v-btn>
            <v-btn color="primary" @click="confirmAddList" :loading="loading2" :disabled="!valid">确定</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-data-table
      :headers="headers"
      :items="shiningList"
      :items-per-page="20"
      class="elevation-1"
      style="margin-top:15px"
    >
      <template v-slot:item.immortals_text="{ item }">
        <v-chip
          v-for="i in item.immortals_text"
          :key="i.name"
          style="margin-right:5px"
          :color="i.color"
          text-color="white"
        >{{i.name}}</v-chip>
      </template>
      <template v-slot:item.twotwo_text="{ item }">
        <v-chip
          v-for="i in item.twotwo_text"
          :key="i.name"
          style="margin-right:5px"
          :color="i.color"
          text-color="white"
        >{{i.name}}</v-chip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  getItemList,
  addUser,
  getUserList,
  addShiningList,
  getShiningList
} from '../api/myapi'

export default {
  name: 'statistics',
  data() {
    return {
      valid: true,
      dialog1: false,
      dialog2: false,
      loading1: false,
      loading2: false,
      userName: '',
      itemList: [],
      userList: [],
      itemSelect: [],
      twotwo: [],
      shiningList: [],
      userSelect: '',
      menu: false,
      counter: '',
      souls: '',
      store: '',
      date: new Date().toISOString().substr(0, 10),
      rules: {
        required: value => value !== '' || '必填！',
        souls: value =>
          (typeof value === 'number' && Number.parseInt(value) >= 0) ||
          '不合法的数字',
        store: value => Number.parseInt(value) >= 0 || '不合法的数字',
        counter: value => Number.parseInt(value) >= 0 || '不合法的数字'
      },
      headers: [
        { text: '日期', value: 'time' },
        {
          text: '角色',
          align: 'start',
          sortable: false,
          value: 'userName'
        },
        { text: '次数', value: 'number' },
        { text: '史诗灵魂', value: 'souls' },
        { text: '晶石', value: 'store' },
        { text: '深渊', value: 'immortals_text' },
        { text: '2+2', value: 'twotwo_text' }
      ]
    }
  },
  methods: {
    resetDate() {
      this.userSelect = ''
      this.itemSelect = []
      this.twotwo = []
      this.souls = this.store = this.counter = ''
      this.date = new Date().toISOString().substr(0, 10)
      this.userName = ''
      this.$refs.form.resetValidation()
    },
    addUser() {},
    cancelAddUser() {
      this.dialog1 = false
      this.userName = ''
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
      if (this.$refs.form.validate()) {
        this.loading2 = true
        addShiningList({
          time: this.date,
          souls: this.souls,
          store: this.store,
          userId: this.userSelect.id,
          immortals: JSON.stringify(this.itemSelect.map(v => v.id)),
          twotwo: JSON.stringify(this.twotwo.map(v => v.id)),
          number: this.counter
        })
          .then(res => {
            this.loading2 = false
            if (res.result) {
              this.dialog2 = false
              this.resetDate()
              this.$refs.form.resetValidation()
            }
          })
          .catch(err => {
            console.log(err)
            this.loading2 = false
          })
      }
    }
  },
  mounted() {
    getItemList().then(res => {
      if (res.result) {
        this.itemList = res.data
        getShiningList().then(res => {
          if (res.result) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].immortals = JSON.parse(res.data[i].immortals)
              res.data[i].twotwo = JSON.parse(res.data[i].twotwo)
              res.data[i].immortals_text = []
              res.data[i].twotwo_text = []
              for (let j = 0; j < res.data[i].immortals.length; j++) {
                res.data[i].immortals_text.push(
                  this.itemList.find(v => v.id === res.data[i].immortals[j])
                )
              }
              for (let j = 0; j < res.data[i].twotwo.length; j++) {
                res.data[i].twotwo_text.push(
                  this.itemList.find(v => v.id === res.data[i].twotwo[j])
                )
              }
            }
            this.shiningList = res.data
          }
        })
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