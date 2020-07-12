const user = require('../init/user')

let login = async (ctx, next) => {
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
}

let register = async (ctx, next) => {
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
}

module.exports = {
  'POST /login': login,
  'POST /register': register
}