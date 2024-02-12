import express from 'express';
import BookController from '../controllers/bookController.js';
import { createBookValidator } from '../validators/bookValidator.js';


const routes = express.Router();

routes.get('/api/books/', BookController.listBooks);
routes.get('/api/books/search', BookController.findBooksByTitle);
routes.get('/api/books/:id', BookController.getBookById);
routes.post('/api/books/', createBookValidator, BookController.createBook);
routes.put('/api/books/:id', BookController.updateBook);
routes.delete('/api/books/:id', BookController.deleteBook);

export default routes;
