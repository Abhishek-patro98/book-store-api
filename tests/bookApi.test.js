const request = require('supertest');
const app = require('../app');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.error('Redis Client Error', err));
client.connect();


describe('Book API', () => {
  it('GET /books - should fetch books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
  },20000);

  it('POST /books - should create a book', async () => {
    const res = await request(app)
      .post('/books')
      .set('x-role', 'Admin')
      .send({ id: 2, title: 'Animal Farm', author: 'George Orwell' });
    expect(res.statusCode).toBe(201);
  });
});

afterAll(async () => {
    if (client.isOpen) {
        await client.quit();
    }
});