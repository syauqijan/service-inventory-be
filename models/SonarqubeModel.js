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
  bugs: DataTypes.INTEGER,
  vulnerabilities: DataTypes.INTEGER,
  codesmell: DataTypes.INTEGER,
  coverage: DataTypes.INTEGER,
  duplication: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default SonarQube;
