import 'reflect-metadata';

import express from 'express';
import routes from './routes';

// configs
import uploadsConfig from './config/uploads';

// conection import
import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadsConfig.directory));
app.use(routes);

app.listen(3333);
