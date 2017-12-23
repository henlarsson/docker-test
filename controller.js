const router = require('koa-router')()

const monkeyCheck = async (ctx, next) => {
  const { apa } = ctx.query
  if (apa === 'gorilla') {
    ctx.body = `I am ${apa}`
    return
  }

  await next()
}

router.get('/', monkeyCheck, async (ctx, next) => {
  ctx.body = 'I am docker'
  await next()
})

module.exports = router
