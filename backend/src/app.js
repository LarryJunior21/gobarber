import 'dotenv/config';

import express from 'express';
import path from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';
import sentryConfig from './config/sentry';


import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    // USA IMPORT PATH PARA CONSEGUIR UTILIZAR OS ARQUIVOS
    this.server.use('/files', express.static(
      path.resolve(__dirname, '..', 'tmp', 'uploads'),
    ));
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    // QUANDO EXISTEM 4 PARAMETROS O EXPRESS ENTENDE
    // QUE É UM TRATAMENTO DE ERRO
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
      //                                      .toHTML();
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
