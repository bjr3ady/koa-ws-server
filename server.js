const Koa = require('koa')
const WebSocket = require('koa-websocket')
const cors = require('koa-cors')
const mongoose = require('mongoose')
const globalConfig = require('./globalConfig.json')
const server = WebSocket(new Koa())
const port = 3000

/****************************Mongoose DB*******************************/
mongoose.Promise = global.Promise
const { EntityInitializer } = require('./Entities')
EntityInitializer.initialize()
console.log('Mongo db connected.')


const ApiRouter = require('./Routes')
const wsRouter = require('./Routes/ws-router')
const apiRouter = new ApiRouter(server)

server.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}))
wsRouter(server, apiRouter.router)

server.listen(port)
console.log(`${globalConfig.APP_NAME} listening on ${port}...`)
