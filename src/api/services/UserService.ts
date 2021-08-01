/** @format */

import { User } from '../models/User';
import { sequelize } from '../Sequelize';
import { IUser, createUsers, createUser } from '../interfaces/UserInterface';

class UserService implements IUser {
    public id: number;
    public name: string;
    public email: string;
    public password: string;

    constructor() {}

    async add() {
        await sequelize.transaction(async (t) => {
            await User.create(
                {
                    name: 'Joao',
                    password: '12345678',
                    email: 'joao@gmail.com',
                },
                { transaction: t }
            );

            await User.create(
                {
                    name: 'Maria',
                    password: '12345678',
                    email: 'maria@gmail.com',
                },
                { transaction: t }
            );

            await User.create(
                {
                    name: 'Sebastiao',
                    password: '12345678',
                    email: 'sebastiao@gmail.com',
                },
                { transaction: t }
            );
        });
    }

    async create(user: any): Promise<IUser> {
        // await sequelize.transaction(
        //   async (t) => {
        const result = await User.create(user);

        return createUser(result);
        // return new User(user);
        // });
    }

    async update(id: number, user: any) {
        // await sequelize.transaction(
        //   async (t) => {
        return await User.update(user, {
            where: { id },
            fields: ['name', 'email', 'password'],
            //   transaction: t
        });

        // return createUser(result);

        //verifica se tem Id
        // const cod = result.shift()
        // if (cod == 0) {
        //   throw new Error('Id inexistente')
        // }
        // })
    }

    async delete(id: number): Promise<Number> {
        // await sequelize.transaction(
        //   async (t) => {
        return await User.destroy({
            where: { id },
            // transaction: t
        });

        // return createUser(result);

        //verifica se tem Id
        // if (result == 0) {
        //   throw new Error('Id inexistente')
        // }
        // })
    }

    async getAll(): Promise<IUser[]> {
        const result = await User.findAll({
            order: ['name'],
        });
        return createUsers(result);
    }

    async getById(id: number): Promise<IUser> {
        const result = await User.findByPk(id);
        return createUser(result);
    }

    async getByEmail(email: string): Promise<IUser> {
        const result = await User.findOne({
            where: { email },
        });
        return createUser(result);
    }
}

export default new UserService();
