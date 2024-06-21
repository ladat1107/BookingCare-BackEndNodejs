'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.allcodes, {
        foreignKey: 'positionId',
        targetKey: 'keyMap',
        as: 'positionData'
      });
      User.belongsTo(models.allcodes, {
        foreignKey: 'roleId',
        targetKey: 'keyMap',
        as: 'roleData'
      });
      User.hasOne(models.Markdown, {
        foreignKey: 'doctorId',
       // targetKey: "id"
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    image: DataTypes.BLOB('long'),
    roleId: DataTypes.STRING,
    positionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};