import { IUser, createUsers, createUserById, createUserByEmail } from '../interfaces/UserInterface';
import Bluebird from 'bluebird';
const model = require('../../db/models');

class UserService implements IUser {

  constructor(
    public id: number = 0,
    public name: string = '',
    public email: string = '',
    public password: string = ''
  ) { }

  create(user: any): Bluebird<IUser> {
    return model.User.create(user);
  }

  getAll(): Bluebird<IUser[]> {
    return model.User.findAll({
      order: ['name']
    })
      .then(createUsers);
  }

  getById(id: number): Bluebird<IUser> {
    return model.User.findOne({
      where: { id }
    })
      .then(createUserById);
  }

  getByEmail(email: string): Bluebird<IUser> {
    return model.User.findOne({
      where: { email }
    })
      .then(createUserByEmail);
  }

  update(id: number, user: any): Bluebird<IUser> {
    return model.User.update(user, {
      where: { id },
      fields: ['name', 'email', 'password'],
      // hooks: true,
      // individualHooks: true
    });
  }

  delete(id: number): Bluebird<IUser> {
    return model.User.destroy({
      where: { id }
    });
  }
}

export default new UserService();
