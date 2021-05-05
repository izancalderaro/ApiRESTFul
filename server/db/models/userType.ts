import { Model, Sequelize, DataTypes, BuildOptions } from 'sequelize';

interface User extends Model {
  readonly id?: string
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
}

type UserStatic = typeof Model & {
  new(values?: Partial<User>, options?: BuildOptions): User;
}

function build(sequelize: Sequelize) {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
  },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }) as UserStatic
  return User
}

module.exports = build