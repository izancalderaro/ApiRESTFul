/** @format */

import express, { Application } from 'express';
import morgan from 'morgan';
import Routes from './routes/Routes';
import Handler from './responses/Handler';
import Auth from './auth/Auth';
import cors from 'cors';
import helmet from 'helmet';
import Session from 'express-session';

class Api {
	public app: Application;
	public sessionItens: any;

	public constructor() {
		this.sessionItens = {
			secret: 'S3cr3t',
			resave: true,
			saveUninitialized: false,
			cookie: { maxAge: 1000, secure: false }
		};

		this.app = express();
		this.middlewares();
		this.router(this.app, Auth);
	}

	private middlewares(): void {
		this.app.use(cors());
		this.app.use(helmet());
		this.app.disable('x-powered-by');
		this.app.use(morgan('dev'));
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(express.json());
		this.app.use(Session(this.sessionItens));
		this.app.use(Auth.config().initialize());
		this.app.use(Auth.config().session());
		this.app.use(Handler.ErrorHandlerApi);
	}

	private router(app: Application, auth?: any): void {
		Routes.initRoutes(app, auth);
	}
}

export default new Api().app;
