"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.Product);
      Cart.belongsTo(models.User);
    }
  }
  Cart.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: "Minimum quantity is 1",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.status = false;
        },
      },
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
