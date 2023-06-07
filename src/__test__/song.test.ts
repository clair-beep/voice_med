import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../index';
import { initializeMongoServer, closeMongoServer } from './mongoConfigTesting';

describe('GET /song and GET /playlist', () => {
  /* Connecting to the database before running the tests specific to POST /song. */
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  it('should return all songs', async () => {
    const res = await request(app).get('/song');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  it('should return all playlists', async () => {
    const res = await request(app).get('/playlist');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(4);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  /* Closing the database connection after running all the tests specific to POST /song. */
  afterAll(async () => {
    await mongoose.connection.close();
  });
});

describe('POST /song', () => {
  /* Connecting to the database before running the tests specific to POST /song. */
  beforeAll(async () => {
    await initializeMongoServer();
  });

  it('should add a song', async () => {
    const res = await request(app).post('/song').send({
      artist: 'The blue  most unique test',
      album: 'Brothers test',
      title: 'Daulphin',
      length: 12,
      track: 12,
    });
    expect(res.statusCode).toBe(201);
  });

  /* Closing the database connection after running all the tests specific to POST /song. */
  afterAll(async () => {
    await closeMongoServer();
  });
});
