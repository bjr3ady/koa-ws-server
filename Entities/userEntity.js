const mongoose = require('mongoose')
const Schema = mongoose.Schema
const _ = require('lodash')

module.exports = new Schema({
  uid: {
    type: String,
    Require: 'User id',
    default: _.uniqueId('u_')
  },
  name: {
    type: String,
    Require: 'User name'
  },
  token: {
    type: String,
    Require: 'User authorize token'
  },
  tokenExpire: {
    type: Number,
    Require: 'Token expire time stamp'
  },
  mobile: {
    type: String,
    Require: 'User mobile'
  },
  email: {
    type: String,
    Require: 'User email'
  },
  pwd: {
    type: String,
    Require: 'User password'
  },
  isBlocked: {
    type: Boolean,
    Require: 'Current user is blocked',
    default: false
  }
}, {collection: 'users'})