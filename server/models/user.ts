import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  createdAt: 'creationDate',
  updatedAt: 'updatedOn'
})
class User extends Model {

  @Column(DataType.TEXT)
  public name: string
  @Column
  public email: string
  @Column
  public password: string

}