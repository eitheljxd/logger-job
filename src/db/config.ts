import {  Sequelize } from 'sequelize'
const { config } = require("aws-sdk");
 import{ getSecrets } from "./../utils/utilsBD.js" 
const sequelizeConnection:any =new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

sequelizeConnection.beforeConnect(async (config:any) => {
    const databaseKeys:any = await getSecrets(process.env.DATABASE_PDM_LOGGER);
    config.username = databaseKeys.username;
    config.password = databaseKeys.password;
    config.database = databaseKeys.dbname;
    config.host = databaseKeys.host;
  });


export default sequelizeConnection