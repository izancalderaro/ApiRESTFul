/** @format */

import { User } from '../models/User';
import { sequelize } from '../Sequelize';
import {
	IUser,
	createUsers,
	createUser
} from '../interfaces/UserInterface';

class UserService implements IUser {
	public id: number;
	public name: string;
	public email: string;
	public password: string;

	constructor() {}

	async add() {
		await sequelize.transaction(async t => {
			await User.create(
				{
					name: 'Joao',
					password: '12345678',
					email: 'joao@gmail.com'
				},
				{ transaction: t }
			);

			await User.create(
				{
					name: 'Maria',
					password: '12345678',
					email: 'maria@gmail.com'
				},
				{ transaction: t }
			);

			await User.create(
				{
					name: 'Sebastiao',
					password: '12345678',
					email: 'sebastiao@gmail.com'
				},
				{ transaction: t }
			);
		});
	}

	async create(user: any) {
		const result = await User.create(user);
		return createUser(result);
	}

	async update(id: number, atributos: any) {
		let result = await User.update(
			atributos,
			{
				where: { id },
				fields: [
					'name',
					'email',
					'password'
				],
				hooks: true,
				individualHooks: true
			}
		);
		//retorna uma tupla [1, User[]], seleciono o item 1 e devolvo "User[]" no payload
		return result[1].pop();
	}

	async delete(id: number) {
		return await User.destroy({
			where: { id }
		});
	}

	async getAll(): Promise<IUser[]> {
		const result = await User.findAll({
			order: ['name']
		});
		return createUsers(result);
	}

	async getById(id: number): Promise<IUser> {
		const result = await User.findByPk(id);
		return createUser(result);
	}

	async getByEmail(
		email: string
	): Promise<IUser> {
		const result = await User.findOne({
			where: { email }
		});
		return createUser(result);
	}
}

export default new UserService();
