const { Mongooses } = require('../Entities')
const UserEntity = Mongooses.DbConnection.model('User')

module.exports = {
  FindUserById: async function (userId) {
    let userEntity = await UserEntity.findOne({ uid: userId }).exec()
    if (userEntity) {
      return {
        actionResult: true,
        message: `Find user by id: ${userId} success.`,
        data: userEntity
      }
    }
    return {
      actionResult: false,
      message: `Failed to find user by id: ${userId}`,
      data: undefined
    }
  }
}