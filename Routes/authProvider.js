const _ = require('lodash')
const crypto = require('crypto')
const { UserService } = require('../ApplicationService')
const globalConfig = require('../globalConfig.json')
const logger = require('../logger')

let authProvider = {
  GenerateBearerToken: (uid, token, url) => {
    let cr = crypto.createHash('md5')
    let cc = `${url},${uid},${token}`
    cr.update(`${url},${uid},${token}`)
    return cr.digest('hex')
  },
  CheckWSAuth: async function (ctx) {
    if (ctx && ctx.req.headers && ctx.request.url && ctx.req.headers['sec-websocket-protocol']) {
      let url = ctx.request.href
      if (globalConfig.USE_HTTPS) {
        url = url.replace('http', 'wss')
      } else {
        url = url.replace('http', 'ws')
      }

      let headers = ctx.req.headers['sec-websocket-protocol']
      if (headers.length && headers.indexOf(',')) {
        let uid = headers.split(',')[0]
        let sign = headers.split(',')[1].trim()
        let userData = await UserService.FindUserById(uid)
        if (userData.actionResult) {
          let token = userData.data.token
          let expectedSign = this.GenerateBearerToken(uid, token, url)
          return expectedSign === sign
        }
        logger.debug(`User ${uid} try to connect through web socket but failed.`)
      }
    }
    logger.debug('Unknown client try to connect through web socket but failed.')
    return false
  }
}
module.exports = authProvider