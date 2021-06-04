const { Transaction, User, Product, Cart } = require("../models");
const payment = require("../API/duitku.js");
const sendMail = require("../helpers/nodemailer.js");
class TransactionCtrl {
  static async getAll(req, res, next) {
    try {
      let foundTransactions = await Transaction.findAll({
        where: {
          UserId: req.userData.id,
        },
        include: [User, Product],
      });
      res.status(200).json(foundTransactions);
    } catch (error) {
      next({ status: 500, message: "Internal server error" });
    }
  }

  static async post(req, res, next) {
    try {
      console.log(1111111111);
      let donePayment = await payment(+req.body.price, req.body.method);
      if (donePayment !== "00") {
        return next({ status: 409, message: "Failed Doing Payment" });
      }
      let dataTransaction = {
        ProductId: +req.body.ProductId,
        UserId: +req.userData.id,
        quantity: +req.body.quantity,
        price: +req.body.price,
        date: new Date(),
      };
      // Create transaction here
      let createdTransaction = await Transaction.create(dataTransaction);
      // End create transaction
      // Find by pk first
      let foundProduct = await Product.findByPk(+req.body.ProductId);
      // sukses found
      let afterBought = { stock: foundProduct.stock - req.body.quantity };
      // update stock after transaction
      sendMail(foundProduct.name, req.userData.email);
      await Product.update(afterBought, {
        where: {
          id: foundProduct.id,
        },
      });
      // update stock success
      let updateStatus = {
        status: true,
      };
      // update cart status
      await Cart.update(updateStatus, {
        where: {
          ProductId: +req.body.ProductId,
        },
      });
      // update cart status success
      res.status(200).json(createdTransaction);
    } catch (error) {
      next({ status: 500, message: "Internal server error" });
    }
  }
}

module.exports = TransactionCtrl;
