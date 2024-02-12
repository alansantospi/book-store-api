import request from 'supertest';
import {
  describe, expect, it, jest,
} from '@jest/globals';
import app from '../../app.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Order Operations', () => {
  let authorId;
  let bookId;
  let orderId;
  let userId;

  it('should create an author', async () => {
    const { status, body } = await request(app)
      .post('/api/authors')
      .send({ name: 'John Doe', bio: 'A talented author' });

    expect(status).toBe(201);
    expect(body).toHaveProperty('message', 'Author successfully created');
    expect(body).toHaveProperty('author');
    authorId = body.author._id;
  });

  it('should create an user', async () => {
    const { status, body } = await request(app)
      .post('/api/users')
      .send({     
        email: 'jane.doe@example.com',
        username: 'janedoe',
        password: 'password123'
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('message', 'User successfully created');
    expect(body).toHaveProperty('user');
    userId = body.user._id;
  });

  it('should create a book', async () => {
    const { status, body } = await request(app)
      .post('/api/books')
      .send({ 
        title: 'Sample Book', 
        author: authorId,
        year: 2000,
        pages: 1000,
        price: 50
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('message', 'Book successfully created');
    expect(body).toHaveProperty('book');
    expect(body.book).toHaveProperty('_id');

    bookId = body.book._id;
  });

  it('when userId is missing then should not create an order', async () => {
    const { status, body } = await request(app)
      .post('/api/orders')
      .send({ 
        bookIds: [
            bookId
        ]
      });

    expect(status).toBe(400);
    expect(body).toHaveProperty('errors');
    expect(body.errors[0]).toHaveProperty('msg', 'User id is required');
  });

  it('when bookIds is missing then should not create an order', async () => {
    const { status, body } = await request(app)
      .post('/api/orders')
      .send({ 
        userId: userId
      });

      expect(status).toBe(400);
      expect(body).toHaveProperty('errors');
      expect(body.errors[0]).toHaveProperty('msg', 'Book ids are required');
  });

  it('should create an order', async () => {
    const { status, body } = await request(app)
      .post('/api/orders')
      .send({ 
        userId: userId,
        bookIds: [
            bookId
        ]
      });

    expect(status).toBe(201);
    expect(body).toHaveProperty('message', 'Order successfully created');
    expect(body).toHaveProperty('order');
    expect(body.order).toHaveProperty('_id');
    expect(body.order).toHaveProperty('books');
    expect(body.order.books).toHaveLength(1);
    expect(body.order.books[0]).toHaveProperty('_id', bookId);
    expect(body.order).toHaveProperty('user');
    expect(body.order.user).toHaveProperty('_id', userId);
    orderId = body.order._id;
  });

  it('should get all orders', async () => {
    const { status, body } = await request(app).get('/api/orders');
    expect(status).toBe(200);
    expect(body).toHaveLength(1); // Assuming one order was created in the previous test
  });

  it('should get a specific order by ID', async () => {
    const { status, body } = await request(app).get(`/api/orders/${orderId}`);
    expect(status).toBe(200);
    expect(body.order).toHaveProperty('_id', orderId);
  });

  it('when orderId is invalid then should return error', async () => {
    const _id = '65c68d4d2f7b1827602fc298';
    const verifyResponse = await request(app).get(`/api/orders/${_id}`);
    expect(verifyResponse.status).toBe(404);
  });

  
});
