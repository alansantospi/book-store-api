import express from 'express';
import books from './bookRoutes.js';
import orders from './orderRoutes.js';
import users from './userRoutes.js';
import authors from './authorRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Classic Book Store'));
  app.use(
    express.json(), 
      books, 
      orders,
      users,
      authors);
};

export default routes;
