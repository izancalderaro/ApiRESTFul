import express, { Application } from "express";
import morgan from "morgan";
import * as bodyParser from "body-parser";
import Routes from "./routes/Routes";
import { ErrorHandlerApi, IgnoreFavicon } from "./responses/ErrorHandlerApi";


class Api {

  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares(): void {
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.routes(this.app);
    this.app.use(ErrorHandlerApi);
    this.app.use(IgnoreFavicon);
  }

  private routes(api: Application) {
    new Routes(api);
  }
}

export default new Api().app
