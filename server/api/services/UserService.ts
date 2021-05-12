import { sequelize } from '../../Sequelize';
import { User } from "../../models/User";
import { IUser, createUsers, createUserById, createUserByEmail, createUser } from '../interfaces/UserInterface';
import { result } from 'lodash';



class UserService implements IUser {

  constructor(
    public id: number = 0,
    public name: string = '',
    public email: string = '',
    public password: string = ''
  ) { }


  async create(user: IUser): Promise<IUser> {
    try {
      await sequelize.transaction(async (t) => {
        const result = await User.create(user, {
          transaction: t
        });
      })
      return user
    } catch (err) {
      return err
    }
  }

  async getAll(): Promise<IUser[]> {
    const result = await User.findAll({
      order: ['id']
    });
    return createUsers(result);
  }


  async getById(id: number): Promise<IUser> {
    const result = await User.findByPk(id);
    return createUserById(result);
  }

  async getByEmail(email: string): Promise<IUser> {
    const result = await User.findOne({
      where: { email }
    });
    return createUserByEmail(result)
  }

  async update(id: number, user: IUser): Promise<IUser> {
    try {
      await sequelize.transaction(async (t) => {
        const result = await User.update(user, {
          where: { id },
          fields: ['name', 'email', 'password'],
          transaction: t
        });
      });
      return user

    } catch (err) {
      return err
    }
  }

  async delete(id: number): Promise<string> {
    await sequelize.transaction(async (t) => {
      const result = await User.destroy({
        where: { id },
        transaction: t
      });
    })
    return `Usuário excluído`
  }

  async add(): Promise<string> {
    await sequelize.transaction(async (t) => {
      await User.create({
        name: 'Izan',
        password: '12345678',
        email: 'izancalderaro@gmail.com'
      }, { transaction: t })

      await User.create({
        name: 'Enzo Matteo',
        password: '12345678',
        email: 'ttocalderaro@gmail.com'
      }, { transaction: t })

      await User.create({
        name: 'Izabella',
        password: '12345678',
        email: 'izabellanocchi@gmail.com'
      }, { transaction: t })
    })

    return 'Usuários adicionados'

  }

}

export default new UserService();
