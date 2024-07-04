'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      specialty.hasOne(models.Markdown, {
        foreignKey: 'specialtyId',
        // targetKey: "id"
      });
      specialty.hasMany(models.Doctor_info, {
        foreignKey: 'specialtyId',
        as: 'specialtyData'
      });

    }
  }
  specialty.init({
    description: DataTypes.TEXT,
    image: DataTypes.TEXT("long"),
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'specialty',
  });
  return specialty;
};