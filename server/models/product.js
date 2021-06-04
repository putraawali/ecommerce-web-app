"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart);
      Product.hasMany(models.Transaction);
      Product.belongsToMany(models.User, {
        through: models.Cart,
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Product name is required",
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: {
            msg: "Please input image using url format",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isEmpty(value) {
            if (!value) {
              throw new Error("Price is required");
            }
          },
          isNumeric: {
            msg: "Price must be number",
          },
          min: {
            args: [0],
            msg: "Price minimum is 0",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "Category is required",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: "Stock must be number",
          },
          isEmpty(value) {
            if (!value) {
              throw new Error("Stock is required");
            }
          },
          min: {
            args: [0],
            msg: "Stock minimum is 0",
          },
        },
      },
      status: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.status = true;
        },
      },
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
