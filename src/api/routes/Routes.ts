/** @format */

import { Application } from 'express';
import UserController from '../controllers/UserController';
import TokenRoutes from '../auth/TokenRoutes';
import cors from 'cors';

class Routes {
	constructor() {}

	initRoutes(app: Application, auth?: any): void {
		app.route('/token').post(TokenRoutes.auth);

		app.route('/api/users')
			.all(auth.config().authenticate())
			.post(UserController.create)
			.get(UserController.getAll);

		app.route('/api/users/email/:email')
			.all(auth.config().authenticate())
			.get(UserController.getByEmail);

		app.route('/api/users/:id')
			.all(auth.config().authenticate())
			.get(UserController.getById)
			.put(UserController.update)
			.patch(UserController.update)
			.delete(UserController.delete);

		//habilita o cors para apenas esta rota
		app.route('/todossemautenticacao').get(
			cors(),
			UserController.getAll
		);
		app.route('/add').post(cors(), UserController.add);

		app.route('/session').get((req, res) => {
			res.json({
				sessao: req.session.id,
				sessaocookie: req.session.cookie
			});
		});
	}
}

export default new Routes();
