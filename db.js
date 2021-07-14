const Sequelize = require('sequelize');
const config = require('./config');

class Database {
    constructor() { }

    async connect() {
        const sequelize = await new Sequelize(config.mysql.options);

        await sequelize.authenticate()
        .then(() => {
            console.info("Successfully connected to database " + config.mysql.options.database + ".");
        })
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
        
        return sequelize;
    }
}

module.exports = Database;