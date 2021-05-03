import HTTPStatus from 'http-status';
import { Response } from 'express';

class Handler {

  constructor() {
  }

  onSucess(_res: Response, data: any) {
    _res.status(HTTPStatus.OK).json({ payload: data })

  }

  onError(_res: Response, message: string, err: any) {
    //send(message)
    _res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ payload: `${message} => Erro: ${err}` })

  }

  dbErrorHandler(_res: Response, err: any) {
    _res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      code: 'ERR-001',
      message: 'Erro Interno do Servidor'
    })
  }

}

export default new Handler()