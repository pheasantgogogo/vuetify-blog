const router = require('koa-router')()
const user = require('../init/user')

router.post('/login', async (ctx, next) => {
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