<template>
  <div>
    <div style="display: inline-block; margin-right: 15px">
      <v-dialog v-model="dialog1" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" rounded
            >添加角色</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title
            >添加角色</v-card-title
          >
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
              >确定</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div style="display: inline-block">
      <v-dialog v-model="dialog2" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on" rounded
            >添加记录</v-btn
          >
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>{{
            dialogTitle
          }}</v-card-title>
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
                  <v-btn text color="primary" @click="menu = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.menu.save(date)"
                    >OK</v-btn
                  >
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
            <v-btn
              color="primary"
              @click="confirmAddList"
              :loading="loading2"
              :disabled="!valid"
              >确定</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-card style="margin: 15px auto" class="mx-auto">
      <v-card-title>
        {{ ((totalShining / totalNumber) * 100).toFixed(2) }}%({{
          totalShining
        }}/{{ totalNumber }})
        <v-spacer></v-spacer>
        {{ ((mythNumber / totalNumber) * 100).toFixed(4) }}%({{ mythNumber }}/{{
          totalNumber
        }})
        <v-spacer></v-spacer>
        {{ ((totalTwoShining / totalTwoNumber) * 100).toFixed(2) }}%({{
          totalTwoShining
        }}/{{ totalTwoNumber }})
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="日期/角色..."
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="shiningList"
        :items-per-page="15"
        class="elevation-1"
        :search="search"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plus'
        }"
      >
        <template v-slot:item.userName="{ item }">
          <span
            :style="
              item.immortals_text.length === 0 && item.twotwo_text.length === 0
                ? 'color:red'
                : ''
            "
            >{{ item.userName }}</span
          >
        </template>
        <template v-slot:item.immortals_text="{ item }">
          <v-chip-group column>
            <v-tooltip
              top
              v-for="i in item.immortals_text"
              :key="i.name"
              nudge-bottom="3"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  :color="i.color"
                  :text-color="i.myth ? i.color : 'white'"
                  v-bind="attrs"
                  v-on="on"
                  :outlined="!!i.myth"
                >
                  <span>{{ i.name }}</span>
                  <v-icon v-if="i.myth" right>mdi-emoticon-poop</v-icon>
                </v-chip>
              </template>
              <span
                :style="
                  i.myth
                    ? 'background-image: -webkit-linear-gradient(bottom, rgb(182, 124, 200), rgb(234, 189, 104)); -webkit-background-clip: text;-webkit-text-fill-color: transparent;'
                    : ''
                "
                >{{ i.position_text }}：{{ i.description }}</span
              >
            </v-tooltip>
          </v-chip-group>
        </template>
        <template v-slot:item.twotwo_text="{ item }">
          <v-chip-group column>
            <v-tooltip top v-for="i in item.twotwo_text" :key="i.name">
              <template v-slot:activator="{ on, attrs }">
                <v-chip
                  :color="i.color"
                  :text-color="i.myth ? i.color : 'white'"
                  v-bind="attrs"
                  v-on="on"
                  :outlined="!!i.myth"
                >
                  <span>{{ i.name }}</span>
                  <v-icon v-if="i.myth" right>mdi-emoticon-poop</v-icon>
                </v-chip>
              </template>
              <span
                :style="
                  i.myth
                    ? 'background-image: -webkit-linear-gradient(bottom, rgb(182, 124, 200), rgb(234, 189, 104)); -webkit-background-clip: text;-webkit-text-fill-color: transparent;'
                    : ''
                "
                >{{ i.position_text }}：{{ i.description }}</span
              >
            </v-tooltip>
          </v-chip-group>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <v-card height="1250" v-if="false">
      <v-card-title>Some useless data</v-card-title>
      <v-charts :options="options" ref="sumPriceData"></v-charts>
      <v-charts :options="option" ref="sumPriceData"></v-charts>
    </v-card>
    <notifications></notifications>
  </div>
</template>

<script>
import {
  getItemList,
  addUser,
  getUserList,
  addShiningList,
  getShiningList,
  updateShining
} from '../api/myapi'

export default {
  name: 'statistics',
  data() {
    return {
      options: {
        title: {
          text: '智慧的引导',
          left: 'center',
          align: 'right'
        },
        legend: {
          data: ['累计', '单日'],
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 50,
            end: 100
          }
        ],
        yAxis: [{ type: 'value', name: '爆率(%)' }],
        series: [
          {
            data: [],
            type: 'line',
            name: '累计',
            symbol: 'none',
            smooth: true
          },
          {
            data: [],
            type: 'line',
            name: '单日'
          }
        ]
      },
      option: {
        title: {
          text: '痛苦地下城+暗黑神殿',
          left: 'center',
          align: 'right'
        },
        legend: {
          data: ['累计', '单日'],
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        xAxis: {
          type: 'category',
          data: []
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 50,
            end: 100
          }
        ],
        yAxis: [{ type: 'value', name: '爆率(%)' }],
        series: [
          {
            data: [],
            type: 'line',
            name: '累计',
            symbol: 'none',
            smooth: true
          },
          {
            data: [],
            type: 'line',
            name: '单日'
          }
        ]
      },
      mythNumber: 0,
      totalTwoNumber: 0,
      totalTwoShining: 0,
      totalNumber: 0,
      totalShining: 0,
      editIndex: -1,
      search: '',
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
        required: (value) => value !== '' || '必填！',
        souls: (value) =>
          (typeof value === 'number' && Number.parseInt(value) >= 0) ||
          '不合法的数字',
        store: (value) => Number.parseInt(value) >= 0 || '不合法的数字',
        counter: (value) => Number.parseInt(value) >= 0 || '不合法的数字'
      },
      headers: [
        { text: '日期', value: 'time', width: 120 },
        {
          text: '角色',
          align: 'start',
          sortable: false,
          value: 'userName',
          width: 80
        },
        { text: '次数', width: 75, value: 'number' },
        { text: '史诗灵魂', width: 100, value: 'souls' },
        { text: '晶石', width: 75, value: 'store', divider: true },
        { text: '深渊', value: 'immortals_text', divider: true },
        { text: '痛苦地下室+暗黑神殿', value: 'twotwo_text', divider: true },
        { text: '操作', width: 100, value: 'actions', sortable: false }
      ]
    }
  },
  methods: {
    editItem(item) {
      this.editIndex = this.shiningList.indexOf(item)
      this.dialog2 = true
      this.date = item.time
      this.counter = item.number
      this.souls = item.souls
      this.store = item.store
      this.userSelect = this.userList.find((v) => v.id === item.userId)
      this.itemSelect = item.immortals_text
      this.twotwo = item.twotwo_text
    },
    deleteItem(item) {},
    getUserList() {
      getUserList().then((res) => {
        if (res.result) {
          this.userList = res.data
        }
      })
    },
    getShiningList() {
      this.totalNumber = 0
      this.totalShining = 0
      this.totalTwoNumber = 0
      this.totalTwoShining = 0
      this.mythNumber = 0
      this.options.xAxis.data = []
      this.option.xAxis.data = []
      this.options.series[0].data = []
      this.options.series[1].data = []
      this.option.series[0].data = []
      this.option.series[1].data = []
      getShiningList().then((res) => {
        if (res.result) {
          let counter = 0
          let twotwo_counter = 0
          let twotwo_ss_counter = 0
          let ss_counter = 0
          for (let i = res.data.length - 1; i > -1; i--) {
            res.data[i].immortals = JSON.parse(res.data[i].immortals)
            for (let j = 0; j < res.data[i].immortals.length; j++) {
              if (res.data[i].immortals[j] > 199) {
                this.mythNumber += 1
              }
            }
            res.data[i].twotwo = JSON.parse(res.data[i].twotwo)
            this.options.xAxis.data.push(res.data[i].time)
            this.option.xAxis.data.push(res.data[i].time)
            if (i === res.data.length - 1) {
              res.data[i].currentCounter = res.data[i].number
              res.data[i].currentTwotwoCounter = 4
              res.data[i].ss_counter = res.data[i].immortals.length
              res.data[i].twotwo_ss_counter = res.data[i].twotwo.length
            } else {
              res.data[i].ss_counter = res.data[i].immortals.length + ss_counter
              res.data[i].currentTwotwoCounter = 4 + twotwo_counter
              res.data[i].twotwo_ss_counter =
                res.data[i].twotwo.length + twotwo_ss_counter
              res.data[i].currentCounter = res.data[i].number + counter
            }
            counter += res.data[i].number
            twotwo_counter += 4
            twotwo_ss_counter += res.data[i].twotwo.length
            ss_counter += res.data[i].immortals.length
            this.options.series[0].data.push(
              (
                (res.data[i].ss_counter / res.data[i].currentCounter) *
                100
              ).toFixed(2)
            )
            this.options.series[1].data.push(
              (
                (res.data[i].immortals.length / res.data[i].number) *
                100
              ).toFixed(2)
            )
            this.option.series[0].data.push(
              (
                (res.data[i].twotwo_ss_counter /
                  res.data[i].currentTwotwoCounter) *
                100
              ).toFixed(2)
            )
            this.option.series[1].data.push(
              ((res.data[i].twotwo.length / 4) * 100).toFixed(2)
            )
            this.totalNumber += res.data[i].number
            this.totalTwoNumber += 4
            this.totalShining += res.data[i].immortals.length
            this.totalTwoShining += res.data[i].twotwo.length
            res.data[i].immortals_text = []
            res.data[i].twotwo_text = []
            for (let j = 0; j < res.data[i].immortals.length; j++) {
              res.data[i].immortals_text.push(
                this.itemList.find((v) => v.id === res.data[i].immortals[j])
              )
            }
            for (let j = 0; j < res.data[i].twotwo.length; j++) {
              res.data[i].twotwo_text.push(
                this.itemList.find((v) => v.id === res.data[i].twotwo[j])
              )
            }
          }
          this.shiningList = res.data
        }
      })
    },
    resetDate() {
      this.$nextTick(function () {
        this.editIndex = -1
        this.userSelect = ''
        this.itemSelect = []
        this.twotwo = []
        this.souls = this.store = this.counter = ''
        this.date = new Date().toISOString().substr(0, 10)
        this.userName = ''
        this.$refs.form.resetValidation()
      })
    },
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
      })
        .then((res) => {
          this.loading1 = false
          this.dialog1 = false
          if (res.result) {
            this.$notify({
              title: '添加成功！',
              message: '今天又是充满希望的一天！(ง •_•)ง',
              type: 'success'
            })
            this.userName = ''
            this.getUserList()
          }
        })
        .catch(() => {
          this.loading1 = false
          this.dialog1 = false
          this.$notify({
            title: '出错啦！',
            message: '您没有权限这么做哦 (=´ω｀=)',
            type: 'warning'
          })
        })
    },
    confirmAddList() {
      if (this.$refs.form.validate()) {
        this.loading2 = true
        if (this.editIndex === -1) {
          addShiningList({
            time: this.date,
            souls: this.souls,
            store: this.store,
            userId: this.userSelect.id,
            immortals: JSON.stringify(this.itemSelect.map((v) => v.id)),
            twotwo: JSON.stringify(this.twotwo.map((v) => v.id)),
            number: this.counter
          })
            .then((res) => {
              this.loading2 = false
              if (res.result) {
                this.$notify({
                  title: '添加成功！',
                  message: '今天又是充满希望的一天！(ง •_•)ง',
                  type: 'success'
                })
                this.dialog2 = false
                this.resetDate()
                this.$refs.form.resetValidation()
                this.getShiningList()
              }
            })
            .catch((err) => {
              this.dialog2 = false
              this.loading2 = false
              this.$notify({
                title: '出错啦！',
                message: '您没有权限这么做哦 (=´ω｀=)',
                type: 'warning'
              })
            })
        } else {
          const item = this.shiningList[this.editIndex]
          updateShining({
            id: item.id,
            time: this.date,
            souls: this.souls,
            store: this.store,
            userId: this.userSelect.id,
            immortals: JSON.stringify(this.itemSelect.map((v) => v.id)),
            twotwo: JSON.stringify(this.twotwo.map((v) => v.id)),
            number: this.counter
          })
            .then((res) => {
              this.loading2 = false
              this.dialog2 = false
              if (res.result) {
                this.getShiningList()
                this.$notify({
                  title: '修改成功！',
                  message: '今天又是充满希望的一天！(ง •_•)ง',
                  type: 'success'
                })
                this.editIndex = -1
              }
            })
            .catch((err) => {
              console.log(1, err)
              this.$notify({
                title: '出错啦！',
                message: '您没有权限这么做哦 (=´ω｀=)',
                type: 'warning'
              })
              this.loading2 = false
              this.dialog2 = false
              this.editIndex = -1
            })
        }
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.editIndex === -1 ? '添加记录' : '修改记录'
    }
  },
  mounted() {
    getItemList().then((res) => {
      if (res.result) {
        this.itemList = res.data
        this.getShiningList()
      }
    })
    getUserList().then((res) => {
      if (res.result) {
        this.userList = res.data
      }
    })
  }
}
</script>

<style lang="css">
.echarts {
  width: 100%;
  height: 580px;
}
</style>