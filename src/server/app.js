const Sequelize = require('sequelize')
const Koa = require('koa')
// const WebSocket = require('ws')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// const WebSocketServer = WebSocket.Server
const urlSplit = require('./utils/urlSplit')
const path = require('path')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const static = require('koa-static')
const cors = require('koa2-cors')
const compress = require('koa-compress')
const uuid = require('node-uuid')
const http = require('http')
const https = require('https')
const fs = require('fs')
const enforceHttps = require('koa-sslify').default
const controller = require('./controller');
const options = {
  threshold: 2048
}
// const SSL = {
//   key: fs.readFileSync('./ssl/wangluhong.cn.key'), // ssl文件路径
//   cert: fs.readFileSync('./ssl/wangluhong.cn.pem') // ssl文件路径
// }
app.use(
  cors({
    origin: function (ctx) {
      return 'http://localhost:8080' // 只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
    credentials: true, // 是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'] // 设置服务器支持的所有头信息字段
  })
)
// app.use(enforceHttps())
app.use(compress(options))
app.use(async (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err
    }
  })
})
app.use(historyApiFallback({ whiteList: ['/api'] }))
// app.use(static(path.join(__dirname, '../dist')))
app.use(
  koajwt({
    secret: 'wlh_token'
  }).unless({
    path: [/\/login/, /\/register/, /\/getItemList/, /\/getShiningList/, /\/getUserList/]
  })
)
app.use(bodyParser())
app.use(controller());
app.listen(3000)

// http.createServer(app.callback()).listen(80)
// https.createServer(SSL, app.callback()).listen(443)
