/** @format */

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'development' ? '.env.testing' : '.env',
});

export const sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'postgres',
    models: [__dirname + '/models'],
});
