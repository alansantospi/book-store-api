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

describe('Book CRUD Operations', () => {
  let authorId;
  let bookId;

  it('should create an author', async () => {
    const { status, body } = await request(app)
      .post('/api/authors')
      .send({ name: 'John Doe', bio: 'A talented author' });

    expect(status).toBe(201);
    expect(body).toHaveProperty('message', 'Author successfully created');
    expect(body).toHaveProperty('author');
    authorId = body.author._id;
  });

  it('when authorId is invalid then should return error', async () => {
    const authorId = '65c68d4d2f7b1827602fc298';
    
    const { status, body } = await request(app)
      .post('/api/books')
      .send({ 
        title: 'Fancy Book', 
        author: authorId,
        year: 2000,
        pages: 1000,
        price: 50
      });

    expect(status).toBe(404);
    expect(body).toHaveProperty('message', 'Author not found: 65c68d4d2f7b1827602fc298');
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
    expect(body.book).toHaveProperty('year', 2000);
    expect(body.book).toHaveProperty('pages', 1000);
    expect(body.book).toHaveProperty('price', 50);
    bookId = body.book._id;
  });

  it('should get all books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1); // Assuming one book was created in the previous test
  });

  it('should get a specific book by ID', async () => {
    const response = await request(app).get(`/api/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body.book).toHaveProperty('_id', bookId);
  });

  it('when bookId is invalid then should return error', async () => {
    const _id = '65c68d4d2f7b1827602fc298';
    const verifyResponse = await request(app).get(`/api/books/${_id}`);
    expect(verifyResponse.status).toBe(404);
  });

  it('when bookId is invalid then should not update', async () => {
    const _id = '65c6940ff45eef063ee41b3b';
    const verifyResponse = await request(app).put(`/api/books/${_id}`).send({ title: 'New Book Title' });
    expect(verifyResponse.status).toBe(404);
  });

  describe('PUT /api/books/id', () => {
    test.each([
      ['title', { title: 'New Book Title' }],
      ['author', { author: authorId }],
      ['year', {"year": 2010}],
      ['pages', {"pages": 100}],
      ['price', {"price": 10}],
    ])('should update field %s', async (key, param) => {
      const bookReq = { request };
      const spy = jest.spyOn(bookReq, 'request');
      await bookReq.request(app)
        .put(`/api/books/${bookId}`)
        .send(param)
        .expect(200);
  
      expect(spy).toHaveBeenCalled();
    });
  });

  it('should delete a specific book by ID', async () => {
    const response = await request(app).delete(`/api/books/${bookId}`);
    expect(response.status).toBe(200);

    // Verify that the book has been deleted
    const verifyResponse = await request(app).get(`/api/books/${bookId}`);
    expect(verifyResponse.status).toBe(404);
  });

  it('when bookId is invalid then should not delete', async () => {
    const _id = '65c6940ff45eef063ee41b3b';
    const verifyResponse = await request(app).delete(`/api/books/${_id}`);
    expect(verifyResponse.status).toBe(404);
  });
});
