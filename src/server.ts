import express from 'express';
import routes from './routes/index';
import { connectDB } from './config/db';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import path from 'path';

function createServer() {
  dotenv.config();

  const app = express();

  app.use(bodyParser.json());

  connectDB();

  app.use(express.static('public'));

  app.use('/', routes);

  return app; // Return the app instance
}

export default createServer;
//comment
