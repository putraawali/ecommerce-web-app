const userRouter = require('express').Router()
const UserCtrl = require('../controllers/user')


userRouter.post('/register', UserCtrl.register)
userRouter.post('/login', UserCtrl.login)
// userRouter.post('/googleLogin', UserCtrl.googleLogin)

module.exports = userRouter