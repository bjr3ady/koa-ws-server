const _ = require('lodash')
const logger = require('../logger')
const globalConfig = require('../globalConfig.json')
const Auth = require('./authProvider')

let wsRouter = (server, router) => {
	server.ws.use(async function (ctx, next) {
		/* Check authorize sign */
		if (globalConfig.USE_AUTH) {
      if (!await Auth.CheckWSAuth(ctx)) {
        ctx.websocket.send('Authorize failed.')
        ctx.websocket.close()
        return next(ctx)
      }
		}

		/* Incoming websocket connection */
    logger.debug(`New connection to ${ctx.request.url}`)

		/* Handling sending message from client */
		ctx.websocket.on('message', async message => {
      logger.debug(`Received message: ${message}`)
		})

		/* Handling connection close */
		ctx.websocket.on('close', message => {
      loger.debug(`Connection closed`)
		})
		return next(ctx)
	})
}
module.exports = wsRouter