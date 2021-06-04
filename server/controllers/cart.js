const { Cart, User, Product } = require("../models");

class cartCtrl {
  static async getAll(req, res, next) {
    try {
      let allCart = await Cart.findAll({
        where: { UserId: req.userData.id, status: false },
        include: Product,
      });
      res.status(200).json(allCart);
    } catch (error) {
      next({ status: 500, message: "Internal server error" });
    }
  }

  static async post(req, res, next) {
    let toAdd = {
      UserId: +req.userData.id,
      ProductId: +req.body.ProductId,
      quantity: +req.body.quantity,
    };
    try {
      let getStockToCreate = await Product.findOne({
        where: {
          id: toAdd.ProductId,
        },
      });
      if (getStockToCreate.stock >= toAdd.quantity) {
        let checkCart = await Cart.findOne({
          where: {
            ProductId: +req.body.ProductId,
          },
        });
        if (!checkCart) {
          let added = await Cart.create(toAdd);
          let toShow = {
            id: added.id,
            ProductId: added.ProductId,
            UserId: added.UserId,
            qiantity: added.quantity,
            status: added.status,
          };
          res.status(201).json(toShow);
        } else {
          let qty = {
            quantity: toAdd.quantity + checkCart.quantity,
          };
          let getStock = await Product.findOne({
            where: {
              id: toAdd.ProductId,
            },
          });
          if (getStock.stock >= qty.quantity) {
            let updated = await Cart.update(qty, {
              where: { id: checkCart.id },
              returning: true,
            });
            res.status(200).json(updated);
          } else {
            return next({
              status: 400,
              message: `You already have ${checkCart.quantity} items in your cart for this product`,
            });
          }
        }
      } else {
        throw 400;
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let arrErr = [];
        error.errors.forEach((err) => arrErr.push(err.message));
        next({ status: 400, message: arrErr });
      } else if (error === 400) {
        next({ status: 400, message: "Stock is not enough" });
      } else {
        next({ status: 500, message: "Internal server error" });
      }
    }
  }

  static async patch(req, res, next) {
    let toPatch = { quantity: +req.body.quantity };
    try {
      if (toPatch.quantity < 0)
        return next({
          status: 400,
          message: "Can't input quantity less than 0",
        });
      let checkCart = await Cart.findOne({
        where: {
          id: +req.params.id,
        },
      });
      let checkStock = await Product.findOne({
        where: {
          id: checkCart.ProductId,
        },
      });
      if (toPatch.quantity <= checkStock.stock) {
        let patched = await Cart.update(toPatch, {
          where: {
            id: +req.params.id,
          },
          returning: true,
        });
        console.log(patched[1]);
        let toShow = {
          id: patched[1][0].id,
          ProductId: patched[1][0].ProductId,
          UserId: patched[1][0].UserId,
          qiantity: patched[1][0].quantity,
        };
        res.status(200).json(toShow);
      } else {
        throw 400;
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let arrErr = [];
        error.errors.forEach((err) => arrErr.push(err.message));
        next({ status: 400, message: arrErr });
      } else if (error === 400) {
        next({ status: 400, message: "Stock is not enough" });
      }
      next({ status: 500, message: "Internal server error" });
    }
  }

  static async delete(req, res, next) {
    try {
      await Cart.destroy({ where: { id: +req.params.id } });
      res
        .status(200)
        .json({ message: "Product has been deleted from your cart" });
    } catch (error) {
      next({ status: 500, message: "Internal server error" });
    }
  }
}

module.exports = cartCtrl;
