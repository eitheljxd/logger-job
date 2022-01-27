import { Sequelize } from 'sequelize'
const { config } = require("aws-sdk");
//  import{ getSecrets } from "./../utils/utilsBD.js" 
const sequelizeConnection: any = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: "mysql",
  }
);

sequelizeConnection.beforeConnect(async (config: any) => {
  // const databaseKeys:any = await getSecrets(process.env.DATABASE_PDM_LOGGER);
  config.username = "pdm_logger";
  config.password = "cGRtX2xvZ2dlcg==";
  config.database = "pdm_logger";
  config.host = "pdmlogger.ca0hmdhlkt6h.us-east-2.rds.amazonaws.com";
});


export default sequelizeConnection