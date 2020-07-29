const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const validator = require('validator')
const autopopulate = require('mongoose-autopopulate')
// const owasp = require('owasp-password-strength-test') // 一个密码强度测试工具

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function(email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }))
}

/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 * 用户名验证没用到
 */

// var validateUsername = function(username) {
//   var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/
//   return (
//     this.provider !== 'local' ||
//     username && usernameRegex.test(username)
//   )
// }

var UserSchema = new Schema({
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
    },
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  username: {
    type: String,
    unique: 'Username already exists',
    required: 'Please fill in a username',
    // validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    default: ''
  },
  salt: {
    type: String
  },
  avatar: {
    type: String,
    default: '/images/user.gif'
  },
  roles: [{
    type: Schema.Types.ObjectId, ref: 'Role',
    autopopulate:{ maxDepth: 1 }
  }],
  /* For reset password */
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true
})

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64')
    this.password = this.hashPassword(this.password)
  }
  next()
})

// 密码强度测试。如果强度不够，返回错误  开发模式不用
// UserSchema.pre('validate', function(next) {
//   if (this.provider === 'local' && this.password && this.isModified('password')) {
//     const result = owasp.test(this.password)
//     if (result.errors.length) {
//       const error = result.errors.join(' ')
//       this.invalidate('password', error)
//     }
//   }
//
//   next()
// })

UserSchema.methods.hashPassword = function(password) {
  if (this.salt && password) {
    return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64')
  } else {
    return password
  }
}

UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password)
}

UserSchema.plugin(autopopulate);
module.exports = mongoose.model('User', UserSchema)
