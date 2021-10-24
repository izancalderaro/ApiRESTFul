/** @format */

import {
	Table,
	Column,
	Model,
	DataType,
	NotEmpty,
	IsEmail,
	PrimaryKey,
	AutoIncrement,
	AllowNull
} from 'sequelize-typescript';

@Table({
	tableName: 'User',
	timestamps: true,
	indexes: [
		{
			fields: ['name']
		},
		{
			fields: ['email'],
			unique: true
		}
	]
})
export class User extends Model {
	@AutoIncrement
	@PrimaryKey
	@Column
	public id: number;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING(50))
	public name: string;

	@AllowNull(false)
	@NotEmpty
	@Column(DataType.STRING(100))
	public password: string;

	@AllowNull(false)
	@NotEmpty
	@IsEmail
	@Column(DataType.STRING(50))
	public email: string;
}
