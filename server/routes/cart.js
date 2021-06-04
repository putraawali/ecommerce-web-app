const cartRouter = require('express').Router()
const cartCtrl = require('../controllers/cart')
const authenticate = require('../middlewares/authentication')
const { authorizeCustomerCart, authorizeCustomer } = require('../middlewares/authorization')

cartRouter.use(authenticate)
cartRouter.get('/', authorizeCustomer, cartCtrl.getAll)
cartRouter.post('/', authorizeCustomer, cartCtrl.post)
cartRouter.patch('/:id', authorizeCustomerCart, cartCtrl.patch)
cartRouter.delete('/:id', authorizeCustomerCart, cartCtrl.delete)

module.exports = cartRouter