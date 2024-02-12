import order from '../models/order.js';
import { user } from '../models/user.js';
import { book } from '../models/book.js';

class OrderController {
  // Make an order
  static async createOrder(req, res) {
    const { body } = req;
    if (Object.keys(body).length === 0){
      return res.status(400).json({message: 'Empty request body'})
    }

    const { userId, bookIds } = body;
    try {
      const userFound = await user.findById(userId);
      if (!userFound) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Find the books by their IDs
      const books = await book.find({ _id: { $in: bookIds } });

      // Check if all book IDs are valid
      if (books.length !== bookIds.length) {
        return res.status(400).json({ error: 'One or more books not found' });
      }

      // Create an order
      const newOrder = await order.create({
        user: userFound._doc,
        books: books.map((bookFound) => bookFound._doc),
      });

      res.status(201).json({ message: 'Order successfully created', order: newOrder });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: `${error.message} - Failed to create order` });
    }
  }

  // Get list of orders
  static async listOrders(req, res) {
    try {
      const orders = await order.find({});
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  // Get a specific order by ID
  static async getOrderById(req, res) {
    try {
      const { id } = req.params;
      const orderFound = await order.findById(id);
      if (!orderFound) {
        return res.status(404).json({ message: `Order not found: ${id}` });
      }
      res.status(200).json({ message: 'Order found', order: orderFound });
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  // Get order history for a user
  static async findOrdersByUserId(req, res) {
    const userId = req.query.user;
    try {
      const userFound = await user.findById(userId);
      if (!userFound) {
        return res.status(404).json({ error: `User not found: ${userId}` });
      }
      const ordersByUser = await order.find({ user: userFound });

      if (ordersByUser.length === 0) {
        return res.status(404).json({ error: `No orders found for this user ${userId}` });
      }
      res.json(ordersByUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default OrderController;
