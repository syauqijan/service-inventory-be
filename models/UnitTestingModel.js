import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const UnitTesting = db.define('unit_testing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  coverageStatement: DataTypes.INTEGER,
  coverageBranch: DataTypes.INTEGER,
  coverageFunction: DataTypes.INTEGER,
  coverageLines: DataTypes.INTEGER,
  testCasePassed: DataTypes.INTEGER,
  testCaseFailed: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
}, {
  freezeTableName: true
});

export default UnitTesting;
