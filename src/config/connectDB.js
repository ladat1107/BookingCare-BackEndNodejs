const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('testdb', 'root', "1262003", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        useUTC: false
    },
    timezone: "+07:00",
    raw: true,
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;