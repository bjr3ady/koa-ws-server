const conn = require('./mongooseConnector')

module.exports = {
  Mongooses: {
    DbConnection: conn
  },

  /*****************************Entity Initializer***********************************/
  EntityInitializer: {
    entityMap: [
      { registry: 'User', model: require('./userEntity') }
    ],
    initialize: function () {
      this.entityMap.map(function (modelMap) {
        conn.model(modelMap.registry, modelMap.model)
      })
    }
  },

  /*****************************Entity Objects***********************************/
  UserEntity: require('./userEntity')
}