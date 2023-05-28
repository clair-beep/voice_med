import express from 'express';
import routes from './routes/index';
import connectDB from './config/db';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Rest API is workingsss');
});

app.use('/', routes);

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server started on ${url}`);
});
