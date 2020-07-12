const blog = require('../init/blog')

let getBlog = async (ctx, next) => {
  await blog.findAll().then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res
    }
  })
}

let getSingleBlog = async (ctx, next) => {
  await blog.findAll({
    where: urlSplit(ctx.request.url)
  }).then(res => {
    ctx.response.type = 'application/json'
    ctx.response.body = {
      result: true,
      data: res[0]
    }
  })
}

let postBlog = async (ctx, next) => {
  await blog.create({
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
}

module.exports = {
  'GET /getBlog': getBlog,
  'GET /getSingleBlog': getSingleBlog,
  'POST /postBlog': postBlog
}