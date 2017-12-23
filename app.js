const koa = require('koa')

const log = async (ctx, next) => {
  console.log('Started', `${ctx.request.method} ${ctx.request.url}`)
  await next()
  console.log('End')
}

const start = async () => {
  try {
    const app = new koa()
    app.use(log)
    app.use(require('./controller').routes())
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

start()
