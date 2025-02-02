'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Service.init({
    // categoryId: DataTypes.INTEGER,
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
          model: "Category",
          key: "id"
        }
      },
    serviceName: DataTypes.STRING,
    type: DataTypes.STRING,
    price: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};