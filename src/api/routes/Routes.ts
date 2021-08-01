/** @format */

import { Application } from 'express';
import UserRoutes from './UserRoutes';
// import UserController from '../controllers/UserController';

class Routes {
    constructor(app: Application) {
        this.getRoutes(app);
        // this.auth = auth;
    }

    getRoutes(app: Application): void {
        app.route('/').get((_req, res) => res.send('Ola mundo'));
        app.route('/ola/:nome').get((req, res) => res.send(`Olá, ${req.params.nome}`));

        //Rotas Users
        // app.route('/api/users/add').post(UserController.getAll);
        app.post('/api/users/add', UserRoutes.add);
        app.get('/api/users/all', UserRoutes.getAll); //all
        app.post('/api/users/create', UserRoutes.create); //create
        app.get('/api/users/:id', UserRoutes.getById); //read findByPk
        app.put('/api/users/:id/update', UserRoutes.update); //update
        app.get('/api/users/email/:find', UserRoutes.getByEmail); //read findOn
        app.delete('/api/users/:id/delete', UserRoutes.delete); //delete destroy
        // app.post('/token', this.tokenRoute.auth);
    }
}

export default Routes;
