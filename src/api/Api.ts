import express, { Application } from "express";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import Routes from "./routes/Routes";
import { ErrorHandlerApi, IgnoreFavicon } from "./responses/ErrorHandlerApi";


class Api {

  public app: Application;
  public auth: any

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(ErrorHandlerApi);
    this.app.use(IgnoreFavicon);
    this.routes(this.app, this.auth);

  }

  private routes(api: Application, auth: any) {
    new Routes(api, auth);
  }
}

export default new Api().app
