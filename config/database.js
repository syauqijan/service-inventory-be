// const mysql = require('mysql');

// const pool = mysql.createPool({
//   connectionLimit: process.env.DB_CONNECTION_LIMIT || 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// module.exports = pool;

import {Sequelize} from "sequelize";


// const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
//     host: process.env.DB_HOST,
//     dialect: 'mysql'
// });
const db = new Sequelize('crud_database','root','123456',{
  host: 'localhost',
  dialect: 'mysql'
});
export default db;