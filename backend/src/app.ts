import * as bodyParser from 'body-parser';
import * as express from 'express';
import { createExpressServer } from 'routing-controllers';
import {Connections} from '@common/connections';
import {IConnection} from '@models/connection.model';
import DataBase from '@common/database';
import {CONFIG} from '@common/config';
const logger = require('./logger');
logger.debugLevel = CONFIG.logLevel;

export class App {
  private connection: IConnection = Connections.get('backend');
  public app: express.Application;

  constructor() {
    DataBase.connect();

    this.app = createExpressServer({
      controllers: [],
      middlewares: [
        (req, res, next) => {
          // res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
          res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
          res.setHeader('Access-Control-Allow-Credentials', 'true');
          next();
        },
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json()
      ]
    });

    this.app.listen(this.connection.port, () => {
      logger.info(`Listening at http://${this.connection.host}:${this.connection.port}/`);
    });
  }
}

export default new App().app;
