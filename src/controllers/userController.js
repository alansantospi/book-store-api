import { user } from '../models/user.js';

class UserController {
  // Get list of users
  static async listUsers(req, res) {
    try {
      const users = await user.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const userFound = await user.findById(id);
      res.status(200).json({ message: 'User found', user: userFound });
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'User successfully updated' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to update user` });
    }
  }

  static async createUser(req, res) {
    try {
      const newUser = await user.create(req.body);
      res.status(201).json({ message: 'User successfully created', user: newUser });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create user` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: 'User successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to delete user` });
    }
  }
}

export default UserController;
