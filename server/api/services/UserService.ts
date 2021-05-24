import { sequelize } from '../Sequelize';
import { User } from "../models/User";
import { IUser, createUsers, createUser } from '../interfaces/UserInterface';


class UserService implements IUser {
  public id: number
  public name: string
  public email: string
  public password: string

  constructor() { }

  async add() {
    await sequelize.transaction(
      async (t) => {
        await User.create({
          name: 'Joao',
          password: '12345678',
          email: 'joao@gmail.com'
        }, { transaction: t })

        await User.create({
          name: 'Maria',
          password: '12345678',
          email: 'maria@gmail.com'
        }, { transaction: t })

        await User.create({
          name: 'Sebastiao',
          password: '12345678',
          email: 'sebastiao@gmail.com'
        }, { transaction: t })
      })
  }

  async create(user: IUser) {
    await sequelize.transaction(
      async (t) => {
        await User.create(user, {
          transaction: t
        });
      });
  }

  async getAll(): Promise<IUser[]> {
    const result = await User.findAll({
      order: ['name']
    });
    return createUsers(result);
  }

  async getById(id: number): Promise<IUser> {
    const result = await User.findByPk(id)
    return createUser(result)
  }

  async getByEmail(email: string): Promise<IUser> {
    const result = await User.findOne({
      where: { email }
    });
    return createUser(result);
  }

  async update(id: number, user: IUser) {
    await sequelize.transaction(
      async (t) => {
        const result = await User.update(user, {
          where: { id },
          fields: ['name', 'email', 'password'],
          transaction: t
        })
        //verifica se tem Id
        // const cod = result.shift()
        // if (cod == 0) {
        //   throw new Error('Id inexistente')
        // }
      })
  }

  async delete(id: number) {
    await sequelize.transaction(
      async (t) => {
        const result = await User.destroy({
          where: { id },
          transaction: t
        })
        //verifica se tem Id
        // if (result == 0) {
        //   throw new Error('Id inexistente')
        // }
      })
  }


}

export default new UserService();
