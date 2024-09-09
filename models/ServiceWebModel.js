import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const ServiceWeb = db.define('service_web', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  versionService: {
    type: DataTypes.STRING,
    defaultValue: "1.0.0.0",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "inactive",
  },
  name: DataTypes.STRING,
  gitlabUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  preprodUrl: DataTypes.STRING,
  preprodUrlStatus: DataTypes.STRING,
  prodUrl: DataTypes.STRING,
  prodUrlStatus: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  createdBy: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

ServiceWeb.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ServiceWeb.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

export default ServiceWeb;
