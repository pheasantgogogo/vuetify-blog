<template>
  <div>
    这是tags页面
  </div>
</template>

<script>

export default {
  name: 'tags',
  data() {
    return {
      websocket: '',
      openWs: false,
      msg: '',
      msgList: []
    }
  },
  methods: {
    // ws() {
    //   this.openWs = true
    //   this.websocket = new WebSocket('wss://wangluhong.cn/ws/chat')
    //   this.$Message.success('连接成功')
    //   this.websocket.onmessage = (msg) => {
    //     this.msgList.push(msg.data)
    //   }
    // },
    // send() {
    //   if (this.msg) {
    //     this.websocket.send(this.msg)
    //     this.msg = ''
    //   } else {
    //     this.$Message.error('请输入信息')
    //   }
    // }
  }
}
</script>