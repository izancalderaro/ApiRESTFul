import { Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({ timestamps: true })
class User extends Model {

  @Column(DataType.TEXT)
  public name: string
  @Column
  public email: string
  @Column
  public password: string

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}