import createServer from './server';

const port = 3001;

export const app = createServer();

app.listen(port, () => {
  const url = `http://localhost:${port}`;
  console.log(`Server started on ${url}`);
});
