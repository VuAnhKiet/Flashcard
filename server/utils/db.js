import Sequelize from "sequelize";

export const sequelize = new Sequelize('test1','postgres', 'kietkiet175', {
  host: 'localhost',
  dialect: "postgres",
});
