const {
  Product
} = require('../models')

class ProductCtrl {
  static async getAll(req, res, next) {
    try {
      let products = await Product.findAll({
        where: {
        category: req.params.category
      }})
      res.status(200).json(products)
    } catch (error) {
      next({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }

  static async post(req, res, next) {
    let postProduct = {
      name: req.body.name,
      price: +req.body.price,
      stock: +req.body.stock,
      image_url: req.body.image_url,
      category: req.body.category
    }
    try {
        let created = await Product.create(postProduct)
        let toShow = {
          id: created.id,
          name: created.name,
          price: created.price,
          stock: created.stock,
          image_url: created.image_url,
          status: created.status,
          category: created.category
        }
        res.status(201).json(toShow)
      
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        let arrErr = []
        error.errors.forEach(el => {
          arrErr.push(el.message)
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

  static async getById(req, res, next) {
    try {
      let foundedProduct = await Product.findOne({
        where: {
          id: +req.params.id
        }
      })
      let toShow = {
        id: foundedProduct.id,
        name: foundedProduct.name,
        price: foundedProduct.price,
        stock: foundedProduct.stock,
        image_url: foundedProduct.image_url,
        status: foundedProduct.status,
        category: foundedProduct.category
      }
      res.status(200).json(toShow)
    } catch (error) {
      next({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }

  static async patchById(req, res, next) {
    let toPatch = {
      status: req.body.status
    }
    try {
      let updated = await Product.update(toPatch, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
      let toShow = {
        id: updated[1][0].id,
        name: updated[1][0].name,
        price: updated[1][0].price,
        stock: updated[1][0].stock,
        image_url: updated[1][0].image_url,
        status: updated[1][0].status,
        category: updated[1][0].category
      }
      res.status(200).json(toShow)
    } catch (error) {
      next({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }

  static async putById(req, res, next) {
    let toPut = {
      name: req.body.name,
      price: +req.body.price,
      stock: +req.body.stock,
      status: req.body.status,
      image_url: req.body.image_url,
      category: req.body.category
    }
    try {
      let updated = await Product.update(toPut, {
        where: {
          id: +req.params.id
        },
        returning: true
      })
      let toShow = {
        id: updated[1][0].id,
        name: updated[1][0].name,
        price: updated[1][0].price,
        stock: updated[1][0].stock,
        image_url: updated[1][0].image_url,
        status: updated[1][0].status,
        category: updated[1][0].category
      }
      res.status(200).json(toShow)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        let arrErr = []
        error.errors.forEach(err => {
          arrErr.push(err.message)
        })
        next({
          status: 400,
          message: arrErr
        })
      }
      next({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }

  static async deleteById(req, res, next) {
    try {
      await Product.destroy({
        where: {
          id: +req.params.id
        }
      })
      res.status(200).json({
        message: 'Product deleted successfully'
      })
    } catch (error) {
      next({
        status: 500,
        message: 'Internal Server Error'
      })
    }
  }
}

module.exports = ProductCtrl