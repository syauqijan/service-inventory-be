import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: 3307,
    dialect: 'mysql',
    pool: {
        max: parseInt(process.env.DB_CONNECTION_LIMIT, 10) || 5
    }
});

export default db;