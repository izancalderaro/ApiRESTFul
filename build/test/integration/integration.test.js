"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./config/helpers");
describe('Teste de integração', () => {
    describe('GET /api/users/all', () => {
        it('Deve retornar um Json com todos os usuários', done => {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve criar um novo usuário', done => {
            const usuario = {
                name: 'Usuario de teste',
                email: 'teste@teste.com',
                password: '123456@'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(usuario)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar um Json com apenas um usuários', done => {
            helpers_1.request(helpers_1.app)
                .get(`/api/users/10`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve retornar um Json com atualização de um usuários', done => {
            const usuario = {
                email: 'emailatualizado@teste.com'
            };
            helpers_1.request(helpers_1.app)
                .put(`/api/users/9/update`)
                .send(usuario)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
    describe('Delete /api/users/:id/delete', () => {
        it('Deve deletar um usuário', done => {
            helpers_1.request(helpers_1.app)
                .delete(`/api/users/2/delete`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(200);
                done(error);
            });
        });
    });
});
