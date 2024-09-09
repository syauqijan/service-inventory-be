import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const ServiceApi = db.define('service_api', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  ownerId: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  versionService: {
    type: DataTypes.STRING,
    defaultValue: "1.0.0.0",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "inactive",
  },
  gitlabUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  yamlSpec: {
    type: DataTypes.TEXT('long'), // Mengubah ke tipe LONGTEXT
  },
  sonarQubeId: DataTypes.INTEGER,
  unitTestingId: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

ServiceApi.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

export default ServiceApi;
