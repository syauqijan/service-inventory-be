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
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

Api.belongsTo(ServiceApi, { foreignKey: 'service_api_id' });
ServiceApi.hasMany(Api, { foreignKey: 'service_api_id' });

User.hasMany(ServiceWeb, { foreignKey: 'userId' });
ServiceWeb.belongsTo(User, { foreignKey: 'userId' });

ServiceApi.belongsTo(SonarQube, { foreignKey: 'sonarCubeId' });
SonarQube.hasMany(ServiceApi, { foreignKey: 'sonarCubeId' });

ServiceApi.belongsTo(UnitTesting, { foreignKey: 'unitTestingId' });
UnitTesting.hasMany(ServiceApi, { foreignKey: 'unitTestingId' });


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