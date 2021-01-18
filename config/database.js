const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

module.exports = new Sequelize(
    "postgres://postgres:123456@127.0.0.1:5432/postgres",
    {
        logging: console.log,
        define: {
            freezeTableName: true,
        },
    }
);
