const { Sequelize } = require("sequelize");

const databaseConnection = async () => {
    const sequelize = new Sequelize('systemtesting', 'root', 'Deepesh@123', {
        host: 'localhost',
        dialect: 'mysql'  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = databaseConnection;