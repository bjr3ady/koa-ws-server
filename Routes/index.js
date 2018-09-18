const Router = require('koa-router')
const Auth = require('./authProvider')
const globalConfig = require('../globalConfig.json')

let apiRouter = function (server) {
	let r = new Router()
	return {
		router: r
			.get('/info', ctx => {
				ctx.body = `${globalConfig.APP_NAME}`
			})
			.post('/api/TestToken', async ctx => {
				let req = ctx.request.body
				let uid = req.id
				let token = req.token
				let url = req.url
				if (url && token && uid) {
					ctx.body = await Auth.GenerateBearerToken(uid, token, url)
					return
				}
				ctx.status = 400
			})
	}
}
module.exports = apiRouter