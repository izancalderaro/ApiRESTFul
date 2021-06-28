import { Table, Column, Model, DataType, NotEmpty, IsEmail, PrimaryKey, AutoIncrement } from 'sequelize-typescript'

@Table({
  tableName: 'User',
  timestamps: true,
  indexes: [
    { fields: ['name'] },
    { fields: ['email'], unique: true }
  ]
})
export class User extends Model {

  @AutoIncrement
  @PrimaryKey
  @Column
  public id: number

  @NotEmpty
  @Column(DataType.STRING(50))
  public name: string

  @NotEmpty
  @Column(DataType.STRING(8))
  public password: string

  @NotEmpty
  @IsEmail
  @Column(DataType.STRING(50))
  public email: string

}