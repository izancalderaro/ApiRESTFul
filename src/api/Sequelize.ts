/** @format */

import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from './models/User';

dotenv.config({
	path: process.env.NODE_ENV === 'development' ? '.env.testing' : '.env'
});

// const dialeto = process.env.DB_DIALECT;

export const sequelize = new Sequelize({
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	dialect: 'postgres',
	// models: [__dirname + '/models']
	models: [User]
});

User.beforeCreate(user => hashPassword(user));
User.beforeUpdate(user => hashPassword(user));

function hashPassword(user: User) {
	const salt = bcrypt.genSaltSync(10);
	user.set('password', bcrypt.hashSync(user.password, salt));
}
