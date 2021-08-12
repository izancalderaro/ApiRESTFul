/** @format */

import { User } from '../../src/api/models/User';
import { expect } from './config/helpers';
import UserService from '../../src/api/services/UserService';

describe('===> Testes Unitários do Service ===>', () => {
	const defaultUser = {
		id: 1,
		name: 'Usuario 1',
		email: 'defaultuser@email.com',
		password: '1234'
	};

	beforeEach(done => {
		User.destroy({
			where: {}
		}).then(() => {
			User.create(defaultUser).then(() => {
				done();
			});
		});
	});

	describe('==> Método getAll', () => {
		it('Deve retornar uma lista com todos os Usuários', () => {
			return UserService.getAll().then(data => {
				expect(data).to.be.an('array');
			});
		});
	});

	describe('==> Método getById', () => {
		it('Retornar um usuário de acordo com o ID passado', () => {
			//Deve implementar a lógica do teste.
			return UserService.getById(defaultUser.id).then(data => {
				expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
			});
		});
	});

	describe('==> Método getByEmail', () => {
		it('Retornar um usuário de acordo com o EMAIL passado', () => {
			//Deve implementar a lógica do teste.
			return UserService.getByEmail(defaultUser.email).then(data => {
				expect(data).to.have.all.keys(['email', 'id', 'name', 'password']);
			});
		});
	});

	describe('==> Método Create', () => {
		it('Deve criar o Usuário 2', () => {
			const novoUsuario = {
				id: 2,
				name: 'Usuario 2',
				email: 'novousuario@email.com',
				password: '1234'
			};
			return UserService.create(novoUsuario).then(data => {
				expect(data).to.have.all.keys(['id', 'name', 'email', 'password']);
			});
		});
	});

	describe('==> Método Update', () => {
		it('Deve atualizar um Usuário', () => {
			const usuarioAtualizado = {
				name: 'Usuario 1 Atualizado',
				email: 'atualizado@email.com'
			};
			return UserService.update(defaultUser.id, usuarioAtualizado).then(data => {
				// expect(data[0]).to.be.equal(1)
				expect(data.name).to.be.equal(usuarioAtualizado.name);
			});
		});
	});

	describe('==> Método Delete', () => {
		it('Deve deletar um Usuário', () => {
			return UserService.delete(defaultUser.id).then(data => {
				console.log('=> Delete ' + data);
				expect(data).to.be.equal(1);
			});
		});
	});
});
