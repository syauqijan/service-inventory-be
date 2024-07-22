import Sequelize from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';
import Role from './RoleModel.js';
import ServiceApi from './ServiceApiModel.js';
import Api from './ApiModel.js';
import SonarQube from './SonarqubeModel.js';
import UnitTesting from './UnitTestingModel.js';
import ServiceApiDetail from './ServiceApiDetailModel.js';
import ServiceWeb from './ServiceWebModel.js';

// Associations
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId' });

User.hasMany(ServiceApiDetail, { foreignKey: 'userId' });
ServiceApiDetail.belongsTo(User, { foreignKey: 'userId' });

ServiceApiDetail.belongsTo(ServiceApi, { foreignKey: 'serviceId' });
ServiceApi.hasMany(ServiceApiDetail, { foreignKey: 'serviceId' });

ServiceApiDetail.belongsTo(Api, { foreignKey: 'apiId' });
Api.hasMany(ServiceApiDetail, { foreignKey: 'apiId' });

User.hasMany(ServiceWeb, { foreignKey: 'userId' });
ServiceWeb.belongsTo(User, { foreignKey: 'userId' });

ServiceApi.belongsTo(SonarQube, { foreignKey: 'sonarCubeId' });
SonarQube.hasMany(ServiceApi, { foreignKey: 'sonarCubeId' });

ServiceApi.belongsTo(UnitTesting, { foreignKey: 'unitTestingId' });
UnitTesting.hasMany(ServiceApi, { foreignKey: 'unitTestingId' });


(async () => {
    await db.sync({ force: true });
    console.log("Database & tables created!");
  })();
  
  export {
    User,
    Role,
    ServiceApi,
    Api,
    SonarQube,
    UnitTesting,
    ServiceApiDetail,
    ServiceWeb
  };