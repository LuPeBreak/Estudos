// dependencies
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';

// Errors handler
import AppError from './errors/AppErrors';
// configs
import uploadsConfig from './config/uploads';

// conection import
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadsConfig.directory));
app.use(routes);

// global exeption handler
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'Error',
    message: 'internal server error',
  });
});

app.listen(3333);
