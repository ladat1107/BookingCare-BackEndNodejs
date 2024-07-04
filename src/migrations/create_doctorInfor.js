'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Doctor_infos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: true,
            },
            priceId: {
                type: Sequelize.STRING
            },
            provinceId: {
                type: Sequelize.STRING
            },
            paymentId: {
                type: Sequelize.STRING
            },
            addressClinic: {
                type: Sequelize.STRING
            },
            nameClinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Doctor_infos');
    }
};