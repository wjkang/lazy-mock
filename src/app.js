import Koa2 from 'koa'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import cors from 'koa2-cors'
import { System as SystemConfig } from './config'
import path from 'path'
import Routes from './routes/index'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'

const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

app.use(cors())
if (env === 'development') {
  // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${decodeURI(ctx.url)} - ${ms}ms`)
    })
  })
}
app
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(
    KoaBody({
      multipart: true,
      strict: false,
      formidable: {
        uploadDir: path.join(__dirname, '../assets/uploads/tmp')
      },
      jsonLimit: '10mb',
      formLimit: '10mb',
      textLimit: '10mb'
    })
  )

Object.keys(Routes).forEach(function(key) {
  app.use(Routes[key].routes()).use(Routes[key].allowedMethods())
})

app.listen(SystemConfig.API_SERVER_PORT)

console.log('Now start API server on port ' + SystemConfig.API_SERVER_PORT + '...')

export default app
