import { Application } from "express";
import UserRoutes from "./UserRoutes";

class Routes {
  private tokenRoute: any
  private auth: any

  constructor(app: Application, auth: any) {
    this.getRoutes(app)
    this.auth = auth
  }

  getRoutes(app: Application): void {
    // app.route('/').get((_req, res) => res.send('Ola mundo'))
    // app.route('/ola/:nome').get((req, res) => res.send(`Olá, ${req.params.nome}`))

    //Rotas Users
    app.post('/api/users/add', UserRoutes.add)
    app.post('/api/users/create', UserRoutes.create)   //create 
    app.put('/api/users/:id/update', UserRoutes.update)    //update
    app.delete('/api/users/:id/delete', UserRoutes.delete) //delete destroy
    app.get('/api/users/all', UserRoutes.getAll)    //all
    app.get('/api/users/:id', UserRoutes.getById)	   //read findByPk  
    app.get('/api/users/email/:find', UserRoutes.getByEmail)//read findOn  
    app.post('/token', this.tokenRoute.auth)

  }
}

export default Routes