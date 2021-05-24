import HTTPStatus from "http-status";
import { app, request, expect } from './config/helpers'
import { User } from '../../server/api/models/User';


describe('Teste de integração', () => {

  'use strict'
  const userTest = {
    id: 1,
    name: 'Usuario de teste',
    email: 'teste1@teste.com',
    password: '123456@'
  }

  const userDefault = {
    id: 2,
    name: 'Usuario de teste',
    email: 'teste2@teste.com',
    password: '123456@'
  }

  beforeEach(done => {
    User.destroy({
      where: {}
    })
    // .then(() => {
    User.create(userDefault)
    // })
    // .then(() => {
    User.create(userTest)
    // .then(() => {
    //   done()
    // })
    done()
  })
  // })

  describe('GET /api/users/all', () => {
    it('Deve retornar um Array Json com todos os usuários', done => {
      request(app)
        .get('/api/users/all')
        .end((e, res) => {
          expect(res.status).to.equal(HTTPStatus.OK)
          expect(res.body.payload).to.be.an('array')
          expect(res.body.payload[0].name).to.be.equal(userDefault.name)
          expect(res.body.payload[0].email).to.be.equal(userDefault.email)
          done(e)
        })
    })
  })

  describe('POST /api/users/create', () => {
    it('Deve criar um novo usuário', done => {

      const usuario = {
        id: 100,
        name: 'Usuario de teste',
        email: 'teste3@teste.com',
        password: '123456@'
      }

      request(app)
        .post('/api/users/create')
        .send(usuario)
        .end((e, res) => {
          expect(res.status).to.equal(HTTPStatus.OK)
          expect(res.body.payload.id).to.equal(usuario.id);
          expect(res.body.payload.name).to.equal(usuario.name);
          expect(res.body.payload.email).to.equal(usuario.email);
          done(e)
        })
    })
  })

  describe('GET /api/users/:id', () => {
    it('Deve retornar um Json com apenas um usuários', done => {
      request(app)
        .get(`/api/users/${userDefault.id}`)
        .end((e, res) => {
          expect(res.status).to.equal(HTTPStatus.OK)
          expect(res.body.payload.id).to.equal(userDefault.id);
          expect(res.body.payload).to.have.all.keys([
            'id', 'name', 'email', 'password'
          ]);
          done(e)
        })
    })
  })

  describe('PUT /api/users/:id/update', () => {
    it('Deve retornar um Json com atualização de um usuários', done => {
      const usuario = {
        email: 'emailatualizado@teste.com'
      }
      request(app)
        .put(`/api/users/${userTest.id}/update`)
        .send(usuario)
        .end((e, res) => {
          expect(res.status).to.equal(HTTPStatus.OK);
          expect(res.body.payload[0]).to.eql(1);
          done(e)
        })
    })
  })

  describe('Delete /api/users/:id/delete', () => {
    it('Deve deletar um usuário', done => {
      request(app)
        .delete(`/api/users/${userTest.id}/delete`)
        .end((e, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.payload).to.eql(1);
          done(e)
        })
    })
  })

})

