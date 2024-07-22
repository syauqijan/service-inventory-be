import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const ServiceWeb = db.define('service_web', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  gitlabUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  preprodUrl: DataTypes.STRING,
  preprodUrlStatus: DataTypes.STRING,
  prodUrl: DataTypes.STRING,
  prodUrlStatus: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default ServiceWeb;
