import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const ServiceApi = db.define('service_api', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  gitlabUrl: DataTypes.STRING,
  description: DataTypes.STRING,
  yamlSpec: {
    type: DataTypes.TEXT('long'), // Mengubah ke tipe LONGTEXT
  },
  sonarCubeId: DataTypes.INTEGER,
  unitTestingId: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default ServiceApi;
