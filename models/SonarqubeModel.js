import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const SonarQube = db.define('sonarqube', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  qualityGateStatus: DataTypes.STRING,
  bugs: DataTypes.STRING,
  vulnerabilities: DataTypes.STRING,
  codesmell: DataTypes.STRING,
  coverage: DataTypes.STRING,
  duplication: DataTypes.STRING,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default SonarQube;
