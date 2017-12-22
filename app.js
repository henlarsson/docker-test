const koa = require('koa')
const router = require('koa-router')()

const start = async () => {
  try {
    const app = new koa()
    app.use(router.routes())
    app.proxy = true
    app.listen(process.env.SERVICE_PORT || 4000)
  } catch (err) {
    console.error('Could not start application', err)
    process.exit(1)
  }
}

const terminate = signal => {
  console.info(`Application stopping on ${signal}`)
  process.exit()
}

process.on('SIGINT', () => terminate('SIGINT'))
process.on('SIGTERM', () => terminate('SIGTERM'))

router.get('/', async (ctx, next) => {
  ctx.body = 'I am docker'
  await next()
})

start()
