const {
  User
} = require('../models')
const {
  validate
} = require('../helpers/bcrypt')
const {
  getToken
} = require('../helpers/jwt')

class UserCtrl {
  static async register(req, res, next) {
    let dataRegist = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    try {
      let created = await User.create(dataRegist)
      let toResponse = {
        id: created.id,
        username: created.username,
        email: created.email,
        isAdmin: created.isAdmin
      }
      res.status(201).json(toResponse)
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.errors[0].path === 'username') {
          next({
            status: 400,
            message: 'Username has already exist'
          })
        } else if (error.errors[0].path === 'email') {
          next({
            status: 400,
            message: 'Email has already exist'
          })
        }
      } else if (error.name === 'SequelizeValidationError') {
        let arrErr = []
        error.errors.forEach(err => {
          arrErr.push(err.message)
        })
        next({
          status: 400,
          message: arrErr
        })
      } else {
        next({
          status: 500,
          message: 'Internal Server Error'
        })
      }
    }
  }

  static async login(req, res, next) {
    try {
      let toCheck = User.build({
        email: req.body.email,
        password: req.body.password
      })
      await toCheck.validate({ fields: ['email', 'password'] })
      let foundUser = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (foundUser) {
        let isValid = validate(req.body.password, foundUser.password)
        if (isValid) {
          let payload = {
            id: foundUser.id,
            email: foundUser.email,
            username: foundUser.username,
            isAdmin: foundUser.isAdmin
          }
          let access_token = getToken(payload)
          res.status(200).json({
            access_token, username: foundUser.username
          })
        } else {
          throw 400
        }
      } else {
        throw 400
      }
    } catch (error) {
      if (error === 400) {
        next({
          status: 400,
          message: 'Invalid email/password'
        })
      } else if (error.errors[0].type === 'Validation error') {
        let arrErr = []
          error.errors.forEach(err => {
            arrErr.push(err.message)
          })
          next({
            status: 400,
            message: arrErr
          })
      } else {
        next({
          status: 500,
          message: 'Internal server error'
        })
      }
    }
  }
}

module.exports = UserCtrl