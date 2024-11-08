import { Sequelize, DataTypes } from "sequelize";
import config from "./config.js";

const environment = process.env.NODE_ENV || 'development';
const configEnv = config[environment];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host || 'postgredb',
    dialect: configEnv.dialect,
    port: configEnv.port || 5432,
});

export { sequelize, DataTypes };