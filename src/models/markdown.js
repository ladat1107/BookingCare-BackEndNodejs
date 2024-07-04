'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Markdown.belongsTo(models.User, {
                foreignKey: 'doctorId',
                targetKey: 'id',
            });
            Markdown.belongsTo(models.specialty, {
                foreignKey: 'specialtyId',
                targetKey: 'id',
            });
            Markdown.belongsTo(models.clinic, {
                foreignKey: 'clinicId',
                targetKey: 'id',
            });
        }
    }
    Markdown.init({
        htmlContent: DataTypes.TEXT('long'),
        markDownContent: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};