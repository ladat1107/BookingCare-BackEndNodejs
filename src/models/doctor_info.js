'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Doctor_info.belongsTo(models.allcodes, {
                foreignKey: 'priceId',
                targetKey: 'keyMap',
                as: 'priceData'
            });
            Doctor_info.belongsTo(models.allcodes, {
                foreignKey: 'provinceId',
                targetKey: 'keyMap',
                as: 'provinceData'
            });
            Doctor_info.belongsTo(models.allcodes, {
                foreignKey: 'paymentId',
                targetKey: "keyMap",
                as: 'paymentData'
            });
            Doctor_info.belongsTo(models.User, {
                foreignKey: 'doctorId',
                targetKey: "id",
            });
            Doctor_info.belongsTo(models.specialty, {
                foreignKey: 'specialtyId',
                targetKey: "id",
                as: 'specialtyData'
            });
        }
    }
    Doctor_info.init({
        doctorId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_info',
    });
    return Doctor_info;
};