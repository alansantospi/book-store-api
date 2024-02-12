import express from 'express';
import OrderController from '../controllers/orderController.js';
import { createOrderValidator } from '../validators/orderValidator.js';


const routes = express.Router();

routes.get('/api/orders/', OrderController.listOrders);
routes.get('/api/orders/search/', OrderController.findOrdersByUserId);
routes.get('/api/orders/:id', OrderController.getOrderById);
routes.post('/api/orders/', createOrderValidator, OrderController.createOrder);


export default routes;
