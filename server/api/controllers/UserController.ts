import { Request, Response } from 'express';
import _ from 'lodash';
import HTTPStatus from 'http-status';
import Handlers from '../responses/Handler';
import UserService from '../services/UserService';

class UserServiceController {
  constructor() {

  }

  create(_req: Request, _res: Response) {
    UserService
      .create(_req.body)
      .then(_.partial(Handlers.onSucess, _res))
      .catch(_.partial(Handlers.dbErrorHandler, _res))
      .catch(_.partial(Handlers.onError, _res, `Erro ao inserir novo uasuário`))
  }

  getAll(_req: Request, _res: Response) {
    UserService
      .getAll()
      .then(_.partial(Handlers.onSucess, _res))
      .catch(_.partial(Handlers.onError, _res, `Erro ao buscar todos os usuários`))

  }


  getById(_req: Request, _res: Response) {
    const UserServiceId = parseInt(_req.params.id);
    UserService.getById(UserServiceId)
      .then(_.partial(Handlers.onSucess, _res))
      .catch(_.partial(Handlers.onError, _res, `Usuário não encontrado`))
  }

  update(_req: Request, _res: Response) {
    const UserServiceId = parseInt(_req.params.id);
    const props = _req.body;
    UserService.update(UserServiceId, props)
      .then(_.partial(Handlers.onSucess, _res))
      .catch(_.partial(Handlers.onError, _res, `Falha ao atualizar usuário`))
  }

  delete(_req: Request, _res: Response) {
    const UserServiceId = parseInt(_req.params.id);
    UserService.delete(UserServiceId)
      .then(_.partial(Handlers.onSucess, _res))
      .catch(_.partial(Handlers.onError, _res, `Erro ao excluir usuário`))
  }
}

export default new UserServiceController();
