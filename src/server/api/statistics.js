const router = require('koa-router')()
const statistics = require('../init/statistics')

router.get('/getItemList', async (ctx, next) => {
  await Statistics.findAll().then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res
    }
  })
})