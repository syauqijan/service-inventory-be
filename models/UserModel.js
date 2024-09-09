import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  roleId: DataTypes.INTEGER,
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
  status: {
    type: DataTypes.STRING,
    defaultValue: "enable",
  },
}, {
  freezeTableName: true
});

export default User;

