const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY

function getToken(payload) {
  return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY)
}

module.exports = {
  getToken,
  verifyToken
}