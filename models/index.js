import Sequelize from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';
import Role from './RoleModel.js';
import ServiceApi from './ServiceApiModel.js';
import Api from './ApiModel.js';
import SonarQube from './SonarqubeModel.js';
import UnitTesting from './UnitTestingModel.js';
import ServiceWeb from './ServiceWebModel.js';

// Associations
User.belongsTo(Role, { foreignKey: 'roleId', onDelete: 'CASCADE' });
Role.hasMany(User, { foreignKey: 'roleId', onDelete: 'CASCADE' });

Api.belongsTo(ServiceApi, { foreignKey: 'service_api_id', onDelete: 'CASCADE' });
ServiceApi.hasMany(Api, { foreignKey: 'service_api_id', onDelete: 'CASCADE' });

User.hasMany(ServiceWeb, { foreignKey: 'userId', onDelete: 'CASCADE' });
ServiceWeb.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(ServiceApi, { foreignKey: 'ownerId', onDelete: 'CASCADE' });
ServiceApi.belongsTo(User, { foreignKey: 'ownerId', onDelete: 'CASCADE' });

ServiceApi.belongsTo(SonarQube, { foreignKey: 'sonarCubeId', onDelete: 'CASCADE' });
SonarQube.hasMany(ServiceApi, { foreignKey: 'sonarCubeId', onDelete: 'CASCADE' });

ServiceApi.belongsTo(UnitTesting, { foreignKey: 'unitTestingId', onDelete: 'CASCADE' });
UnitTesting.hasMany(ServiceApi, { foreignKey: 'unitTestingId', onDelete: 'CASCADE' });


(async () => {
  await db.sync({ alter: true });
  console.log("Database & tables synchronized!");
})();

export {
  User,
  Role,
  ServiceApi,
  Api,
  SonarQube,
  UnitTesting,
  ServiceWeb
};
