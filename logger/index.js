const log4js = require('log4js')
const globalConfig = require('../globalConfig.json')

log4js.configure({
  appenders: { websocketserver: {type: 'file', filename: `./logs/${globalConfig.APP_NAME}.log`}},
  categories: { default: { appenders : ['websocketserver'], level: `${globalConfig.LOG_LEVEL}`}}
})

let logger = log4js.getLogger('websocketserver')
module.exports = logger