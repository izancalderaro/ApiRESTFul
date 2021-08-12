/** @format */

import { Request, Response } from 'express';
import UserController from '../controllers/UserController';
import bcrypt from 'bcrypt';
import jwt from 'jwt-simple';
// import httpStatus from 'http-status';
// import _ from 'lodash';
// import Handler from '../responses/Handler';

class TokenRoutes {
	auth(req: Request, res: Response) {
		const credentials = {
			email: req.body.email,
			password: req.body.password
		};
		if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
			UserController.getAuthEmail(credentials.email)
				.then(user => {
					const password = bcrypt.compareSync(credentials.password, user.password);

					if (password) {
						return res.json({
							token: jwt.encode({ id: user.id }, process.env.SECRET)
						});
					} else {
						return res.json({ msg: 'senha não confere' });
					}
				})
				.catch(erro => res.json({ msg: 'Usuário não existe' }));
			// .catch(erro => res.sendStatus(httpStatus.UNAUTHORIZED));
			// .then(_.partial(Handler.AuthSuccess, res, credentials))
			// .catch(_.partial(Handler.AuthFail, req, res));
		}
		console.log(req.sessionID); //sessao sendo gerada
	}
}

export default new TokenRoutes();
