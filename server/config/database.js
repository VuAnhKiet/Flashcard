import {Sequelize,DataTypes} from "sequelize";
import config from "./config.js";

const environment = process.env.NODE_ENV || 'development';
const configEnv = config[environment];

const sequelize = new Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host,
    dialect: configEnv.dialect,
    port: configEnv.port,
});

export {sequelize, DataTypes};