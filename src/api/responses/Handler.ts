/** @format */

import HTTPStatus from 'http-status';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';

class Handler {
	constructor() {}

	onSucess(_res: Response, data: any) {
		_res.status(HTTPStatus.OK).json({ payload: data });
	}

	onError(_res: Response, message: string, err: any) {
		//send(message)
		_res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
			payload: `${message} => ${err}`
		});
		// _res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message)
	}

	dbErrorHandler(_res: Response, err: any) {
		_res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
			code: `ERR-001`,
			message: `${err}`
		});
	}

	ErrorHandlerApi(err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) {
		console.log(`Api errorhandler foi executada: ${err}`);

		res.status(500).json({
			errorCode: 'ERR-001',
			message: 'Erro Interno do Servidor'
		});
	}

	// AuthSuccess(res: Response, credentials: any, data: any) {
	// 	const isMatch = bcrypt.compareSync(credentials.password, data.password);
	// 	if (isMatch) {
	// 		return res.json({ token: jwt.encode({ id: data.id }, process.env.SECRET) });
	// 	} else {
	// 		return res.sendStatus(httpStatus.UNAUTHORIZED);
	// 	}
	// }

	// AuthFail(req: Request, res: Response) {
	// 	return res.sendStatus(httpStatus.UNAUTHORIZED);
	// }

	// export function IgnoreFavicon(err: ErrorRequestHandler, req: Request, res: Response) {
	//   try {
	//     if (req.originalUrl.includes('favicon.ico')) {
	//       res.status(204).end()
	//     }
	//   } catch {
	//     console.log(`IgnoreFavicon foi executado com o erro: ${err}`)
	//   }
	// }
}

export default new Handler();
