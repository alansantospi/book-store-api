import express from 'express';
import UserController from '../controllers/userController.js';

const routes = express.Router();

routes.get('/api/users/', UserController.listUsers);
routes.get('/api/users/:id', UserController.getUserById);
routes.post('/api/users/', UserController.createUser);
routes.put('/api/users/:id', UserController.updateUser);
routes.delete('/api/users/:id', UserController.deleteUser);

export default routes;
