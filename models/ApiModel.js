import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Api = db.define('api', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  endpoint: DataTypes.STRING,
  description: DataTypes.STRING,
  method: DataTypes.INTEGER,
  status: DataTypes.STRING,
  version: DataTypes.STRING,
  platform: DataTypes.STRING,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default Api;
