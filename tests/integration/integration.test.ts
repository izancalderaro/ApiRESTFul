/** @format */

import HTTPStatus from 'http-status';
import { app, request, expect } from './config/helpers';
import { User } from '../../src/api/models/User';
import jwt from 'jwt-simple';

describe('===> Teste de integração ===>', () => {
	'use strict';

	let id: Number;
	let token: any;

	const userTest = {
		id: 100,
		name: 'Usuario 100',
		email: 'teste100@teste.com',
		password: '123'
	};

	const userDefault = {
		id: 1,
		name: 'Usuario 1',
		email: 'teste1@teste.com',
		password: '123'
	};

	beforeEach(done => {
		User.destroy({
			where: {}
		})
			.then(() => {
				return User.create(userDefault);
			})
			.then(user => {
				User.create(userTest).then(() => {
					token = jwt.encode({ id: user.id }, process.env.SECRET);
					done();
				});
			});
	});

	describe('==> POST /token', () => {
		it('=> Deve receber um JWT', done => {
			const credentials = {
				email: userDefault.email,
				password: userDefault.password
			};
			request(app)
				.post('/token')
				.send(credentials)
				.end((error, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.token).to.equal(`${token}`);
					done(error);
				});
		});
	});

	describe('==> POST /token', () => {
		it('=>Não deve gerar Token', done => {
			const credentials2 = {
				email: 'userDefault@email12121',
				password: 'wqff'
			};
			request(app)
				.post('/token')
				.send(credentials2)
				.end((error, res) => {
					expect(res.body.msg).to.not.empty;
					done(error);
				});
		});
	});

	describe('==> POST /api/users', () => {
		it('=> Deve criar um novo usuário', done => {
			const usuario = {
				id: 2,
				name: 'Usuario de teste 2',
				email: 'teste2@teste.com',
				password: '123456'
			};

			request(app)
				.post('/api/users')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(usuario)
				.end((e, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.payload.id).to.equal(usuario.id);
					expect(res.body.payload.name).to.equal(usuario.name);
					expect(res.body.payload.email).to.equal(usuario.email);
					done(e);
				});
		});
	});

	describe('PUT /api/users/:id', () => {
		it('Deve retornar um Json com atualização de um usuários', done => {
			const usuario = {
				name: 'Teste de Update',
				email: 'emailatualizado@teste.com'
			};
			request(app)
				.put(`/api/users/${userTest.id}`)
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.send(usuario)
				.end((e, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.payload.name).to.eql(usuario.name);
					done(e);
				});
		});
	});

	describe('GET /api/users/', () => {
		it('Deve retornar um Array Json com todos os usuários', done => {
			request(app)
				.get('/api/users/')
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.end((e, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.payload).to.be.an('array');
					expect(res.body.payload[0].name).to.be.equal(userDefault.name);
					expect(res.body.payload[0].email).to.be.equal(userDefault.email);
					done(e);
				});
		});
	});

	describe('GET /api/users/:id', () => {
		it('Deve retornar um Json com apenas um usuários', done => {
			request(app)
				.get(`/api/users/${userDefault.id}`)
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.end((e, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.payload.id).to.equal(userDefault.id);
					expect(res.body.payload).to.have.all.keys(['id', 'name', 'email', 'password']);
					done(e);
				});
		});
	});

	describe('GET /api/users/email/:email', () => {
		it('Deve retornar um Json com apenas um usuários', done => {
			request(app)
				.get(`/api/users/email/${userDefault.email}`)
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.end((e, res) => {
					expect(res.status).to.equal(HTTPStatus.OK);
					expect(res.body.payload.id).to.equal(userDefault.id);
					expect(res.body.payload).to.have.all.keys(['id', 'name', 'email', 'password']);
					done(e);
				});
		});
	});

	describe('Delete /api/users/:id', () => {
		it('Deve deletar um usuário', done => {
			request(app)
				.delete(`/api/users/${userTest.id}`)
				.set('Content-Type', 'application/json')
				.set('Authorization', `Bearer ${token}`)
				.end((e, res) => {
					expect(res.status).to.equal(200);
					expect(res.body.payload).to.eql(1);
					done(e);
				});
		});
	});
});
