import express from 'express';
import AuthorController from '../controllers/authorController.js';

const routes = express.Router();

routes.get('/api/authors/', AuthorController.listAuthors);
routes.get('/api/authors/:id', AuthorController.getAuthorById);
routes.post('/api/authors/', AuthorController.createAuthor);
routes.put('/api/authors/:id', AuthorController.updateAuthor);
routes.delete('/api/authors/:id', AuthorController.deleteAuthor);

export default routes;
