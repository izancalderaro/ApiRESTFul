import { Sequelize } from "sequelize-typescript";
import 'dotenv'

export const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  models: [__dirname + '/models']
});