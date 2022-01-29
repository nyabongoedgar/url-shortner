import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../app';
import { addUrl, resetUrls } from '../models/testUtils';

dotenv.config();

describe('test api', () => {
  beforeAll(() => {
    addUrl();
  });

  afterAll(async () => {
    await resetUrls();
    mongoose.connection.close();
  });

  it('creates short link', async () => {
    const response = await request(app).post('/short-urls').send({
      fullUrl: 'https://www.google.com/search?q=url+shortener&oq=google+u&aqs=chrome.0.69i59j69i60l3j0j69i57.1069j0j7&sourceid=chrome&ie=UTF-8',
    });
    expect(response.statusCode).toBe(201);
  });

  it('fails to create short link with 400', async () => {
    const response = await request(app).post('/short-urls').send({ });
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('original long url is required');
  });

  it('gets all short links', async () => {
    const response = await request(app).get('/short-urls');
    expect(response.statusCode).toBe(200);
    expect(response.body.results).toBeDefined();
  });

  it('gets specific short url from DB and redirects to long url', async () => {
    const response = await request(app).get('/test1234');
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toContain('https://www.google.com');
  });

  it('fails to get short url that is not in the database', async () => {
    const response = await request(app).get('/not-there');
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('short url not found');
  });
});
