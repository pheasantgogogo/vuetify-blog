const Sequelize = require('sequelize')
const Koa = require('koa')
// const WebSocket = require('ws')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
// const WebSocketServer = WebSocket.Server
const path = require('path')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const static = require('koa-static')
const cors = require('koa2-cors')
const router = require('koa-router')()
const compress = require('koa-compress')
const uuid = require('node-uuid')
const http = require('http')
const https = require('https')
const fs = require('fs')
const enforceHttps = require('koa-sslify').default
const options = {
  threshold: 2048
}
// const SSL = {
//   key: fs.readFileSync('./ssl/wangluhong.cn.key'), // ssl文件路径
//   cert: fs.readFileSync('./ssl/wangluhong.cn.pem') // ssl文件路径
// }
app.use(
  cors({
    origin: function(ctx) {
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
app.use(
  koajwt({
    secret: 'wlh_token'
  }).unless({
    path: [/\/login/, /\/register/, /\/postBlog/, /\//]
  })
)
app.use(historyApiFallback({ whiteList: ['/api'] }))
// app.use(static(path.join(__dirname, '../dist')))
app.use(bodyParser())
app.use(router.routes())
const config = {
  database: 'my_test', // 使用哪个数据库
  username: 'root', // 用户名
  password: '!Ww19931105', // 口令
  host: 'localhost', // 主机名
  port: 3306 // 端口号，MySQL默认3306
}
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    }
  }
)
var Test = sequelize.define(
  'test_databases',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    name: Sequelize.STRING(255),
    weight: Sequelize.DOUBLE(255),
    height: Sequelize.DOUBLE(255),
    info: Sequelize.STRING(255),
    date: Sequelize.STRING(255)
  },
  {
    timestamps: false
  }
)

var User = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.STRING(11),
      primaryKey: true
    },
    account: Sequelize.STRING(255),
    password: Sequelize.STRING(255)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

var Blog = sequelize.define(
  'blog',
  {
    id: {
      type: Sequelize.STRING(20),
      primaryKey: true
    },
    content: Sequelize.STRING(65536),
    title: Sequelize.STRING(255),
    createAt: Sequelize.NUMBER(20),
    updateAt: Sequelize.NUMBER(20)
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)
app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = 'html'
})

router.get('/data', async (ctx, next) => {
  await Test.findAll().then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res
    }
  })
})

router.get('/getBlog', async (ctx, next) => {
  await Blog.findAll().then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res
    }
  })
})

router.post('/postData', async (ctx, next) => {
  await Test.create({
    name: ctx.request.body.name,
    height: ctx.request.body.height,
    weight: ctx.request.body.weight,
    info: ctx.request.body.info,
    date: ctx.request.body.date
  }).then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true
    }
  })
})

router.post('/postBlog', async (ctx, next) => {
  console.log(new Date().getTime())
  await Blog.create({
    id: uuid.v1(),
    title: ctx.request.body.title,
    content: ctx.request.body.content,
    createAt: new Date().getTime(),
    updateAt: new Date().getTime()
  }).then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true
    }
  })
})

router.post('/login', async (ctx, next) => {
  console.log(1)
  // var params = urlSplit(ctx.request.url)
  var response = await User.findAll({
    where: {
      account: ctx.request.body.account
    }
  })
  if (response.length !== 0) {
    const token = jwt.sign(
      {
        id: response[0].id
      },
      'wlh_token',
      { expiresIn: '2h' }
    )
    ctx.response.type = 'application/json'
    ctx.response.body =
      response[0].password === ctx.request.body.password
        ? { result: true, token: token }
        : { result: false, reason: '密码错误' }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: false,
      reason: '账号不存在'
    }
  }
})

router.post('/register', async (ctx, next) => {
  if (ctx.request.body.account && ctx.request.body.password) {
    var response = await User.findAll({
      where: {
        account: ctx.request.body.account
      }
    })
    if (response.length === 0) {
      await User.create({
        account: ctx.request.body.account,
        password: ctx.request.body.password
      }).then(res => {
        ctx.response.type = 'application/json'
        ctx.response.body = {
          result: true
        }
      })
    } else {
      ctx.response.type = 'application/json'
      ctx.response.body = {
        result: false,
        reason: '账号已经存在'
      }
    }
  } else {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: false,
      reason: '账号或密码不能为空'
    }
  }
})
// function parseUser(obj) {
//   if (!obj) {
//     return
//   }
//   console.log('try parse: ' + obj)
//   let s = ''
//   if (typeof obj === 'string') {
//     s = obj
//   } else if (obj.headers) {
//     const cookies = new Cookies(obj, null)
//     s = cookies.get('name')
//   }
//   if (s) {
//     try {
//       const user = JSON.parse(Buffer.from(s, 'base64').toString())
//       console.log(`User: ${user.name}, ID: ${user.id}`)
//       return user
//     } catch (e) {
//       // ignore
//     }
//   }
// }

// const server = https.createServer(SSL, app.callback()).listen(443)
app.listen(3000)
// const wss = new WebSocketServer({
//   server: server
// })

// wss.on('connection', function(ws) {
//   ws.broadcast = function(data) {
//     wss.clients.forEach(function(client) {
//       client.send(data)
//     })
//   }

//   ws.on('message', function(message) {
//     if (message && message.trim()) {
//       ws.broadcast(message)
//     }
//   })
// })

// http.createServer(app.callback()).listen(80)
// https.createServer(SSL, app.callback()).listen(443)
