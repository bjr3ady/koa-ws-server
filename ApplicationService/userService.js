const { UserDataRepository } = require('../DataRepositories')

let userService = {
  FindUserById: function (userId) {
    return UserDataRepository.FindUserById(userId)
  }
}
module.exports = userService