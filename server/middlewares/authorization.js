const { Cart } = require("../models");

async function authorizeAdmin(req, res, next) {
  if (req.userData.isAdmin) {
    next();
  } else {
    next({ status: 401, message: "You are not admin" });
  }
}

async function authorizeCustomerCart(req, res, next) {
  try {
    let found = await Cart.findOne({
      where: {
        id: +req.params.id,
      },
    });

    if (found.UserId === req.userData.id) {
      next();
    } else {
      throw 401;
    }
  } catch (error) {
    if (error === 401) {
      next({ status: 401, message: "Not your cart" });
    }
  }
}

async function authorizeCustomer(req, res, next) {
  if (!req.userData.isAdmin) {
    next();
  } else {
    next({ status: 401, message: "You are not customer" });
  }
}

module.exports = { authorizeAdmin, authorizeCustomerCart, authorizeCustomer };
