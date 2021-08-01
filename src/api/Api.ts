/** @format */

import express, { Application } from 'express';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import Routes from './routes/Routes';
import { ErrorHandlerApi, IgnoreFavicon } from './responses/ErrorHandlerApi';

class Api {
    public express: Application;

    public constructor() {
        this.express = express();
        this.middlewares();
    }

    private middlewares(): void {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        // this.express.use(express.urlencoded({ extended: true }));
        // this.express.use(express.json());
        this.express.use(ErrorHandlerApi);
        this.express.use(IgnoreFavicon);
        this.routes(this.express);
    }

    private routes(app: Application): void {
        new Routes(app);
    }
}

export default new Api().express;
