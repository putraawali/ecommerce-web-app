const bcrypt = require('bcryptjs')
const SALT = +process.env.SALT

function hashPassword(password) {
  return bcrypt.hashSync(password, SALT)
}

function validate(password, hashed) {
  return bcrypt.compareSync(password, hashed)
}

module.exports = {
  hashPassword,
  validate
}