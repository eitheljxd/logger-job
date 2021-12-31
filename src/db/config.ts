import { Dialect, Sequelize } from 'sequelize'


const sequelizeConnection = new Sequelize('pdm_logger', 'pdm_logger', 'cGRtX2xvZ2dlcg==', {
    host: 'pdmlogger.ca0hmdhlkt6h.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
})

export default sequelizeConnection