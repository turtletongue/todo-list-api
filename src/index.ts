import 'module-alias/register';
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import { session, sessionClient } from '@dependencies';
import { adminsRouter } from '@features/admins/admins-router';
import { tasksRouter } from '@features/tasks/tasks-router';
import { authenticationRouter } from '@features/authentication/authentication-router';
import { requestHandler, errorHandler } from '@middlewares';
import { NotFoundController } from './not-found.controller';
import { databaseConnection } from './dependencies/sequelize';

const app = express();

app.use(session);
app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);
app.use(helmet());

const apiRoot = process.env.API_ROOT;

app.use(apiRoot + 'admins', adminsRouter);
app.use(apiRoot + 'tasks', tasksRouter);
app.use(apiRoot + 'authentication', authenticationRouter);
app.use(requestHandler(new NotFoundController()));

app.use(errorHandler);

const port = process.env.PORT;

(async () => {
  await databaseConnection;

  await sessionClient;

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
})();
