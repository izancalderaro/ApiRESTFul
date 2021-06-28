import { Request, Response } from 'express';
import UserController from '../controllers/UserController';

class UserRoutes {
  constructor() { }


  add(_req: Request, _res: Response) {
    return UserController.add(_req, _res)
  }
  getAll(_req: Request, _res: Response) {
    return UserController.getAll(_req, _res)
  }
  create(_req: Request, _res: Response) {
    return UserController.create(_req, _res)
  }
  getById(_req: Request, _res: Response) {
    return UserController.getById(_req, _res)
  }
  getByEmail(_req: Request, _res: Response) {
    return UserController.getByEmail(_req, _res)
  }
  update(_req: Request, _res: Response) {
    return UserController.update(_req, _res)
  }
  delete(_req: Request, _res: Response) {
    return UserController.delete(_req, _res)
  }
}

export default new UserRoutes()
