const productRouter = require('express').Router()
const ProductCtrl = require('../controllers/product')
const authenticate = require('../middlewares/authentication')
const { authorizeAdmin } = require('../middlewares/authorization')

productRouter.get('/:category', ProductCtrl.getAll)
productRouter.use(authenticate)
productRouter.post('/', authorizeAdmin, ProductCtrl.post)
productRouter.get('/get/:id', authorizeAdmin, ProductCtrl.getById)
productRouter.patch('/:id', authorizeAdmin, ProductCtrl.patchById)
productRouter.put('/:id', authorizeAdmin, ProductCtrl.putById)
productRouter.delete('/:id', authorizeAdmin, ProductCtrl.deleteById)

module.exports = productRouter