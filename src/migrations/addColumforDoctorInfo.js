module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.addColumn('Doctor_infos', 'clinicId', {
                type: Sequelize.INTEGER
            });
            await queryInterface.addColumn('Doctor_infos', 'specialtyId', {
                type: Sequelize.INTEGER
            });
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn('Doctor_infos', 'clinicId');
            await queryInterface.removeColumn('Doctor_infos', 'specialtyId');
            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }
};