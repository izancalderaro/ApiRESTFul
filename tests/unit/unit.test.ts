import { User } from '../../src/api/models/User';
import { expect } from './config/helpers';
import UserService from '../../src/api/services/UserService';

describe('Testes Unitários do Service', () => {

  let email: any;
  let _id: any;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'defaultuser@email.com',
    password: '1234'
  }

  beforeEach((done) => {
    User.destroy({
      where: {}
    })
      .then(() => {
        User.create(defaultUser).then(() => {
          console.log(`Default User created`)
          done();
        });
      })
  });


  describe('Método Create', () => {
    it('Deve criar um novo Usuário', () => {
      return UserService.create({
        id: 2,
        name: 'Novo Usuario',
        email: 'novousuario@email.com',
        password: '1234'
      })
        .then(data => {
          expect(data).to.have.all.keys(
            ['email', 'id', 'name', 'password', 'updatedAt', 'createdAt']
          )
        });
    });
  })

  describe('Método Update', () => {
    it('Deve atualizar um Usuário', () => {
      const usuarioAtualizado = {
        name: 'Nome Atualizado',
        email: 'atualizado@email.com'
      };
      return UserService.update(defaultUser.id, usuarioAtualizado)
        .then(data => {
          console.log(data);
          expect(data[0]).to.be.equal(1);
        })
    });
  });

  describe('Método Delete', () => {
    it('Deve deletar um Usuário', () => {
      return UserService.delete(defaultUser.id).then(data => {
        console.log(data)
        expect(data).to.be.equal(1);
      })
    });
  });

  describe('Método GET Users', () => {
    it('Deve retornar uma lista com todos os Usuários', () => {
      return UserService.getAll().then(data => {
        expect(data).to.be.an('array');
      })
    })
  });

  describe('Método getById', () => {
    it('Retornar um usuário de acordo com o ID passado', () => {
      //Deve implementar a lógica do teste.
      return UserService.getById(defaultUser.id).then(data => {
        expect(data).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        )
      })
    })
  })

  describe('Método getByEmail', () => {
    it('Retornar um usuário de acordo com o EMAIL passado', () => {
      //Deve implementar a lógica do teste.
      return UserService.getByEmail(defaultUser.email).then(data => {
        expect(data).to.have.all.keys(
          ['email', 'id', 'name', 'password']
        )
      })
    })
  })



})
