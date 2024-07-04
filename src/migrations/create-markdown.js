'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Markdowns', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            htmlContent: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            markDownContent: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT('long'),
                allowNull: true,
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            clinicId: {
                type: Sequelize.INTEGER
            },
            specialtyId: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Markdowns');
    }
};