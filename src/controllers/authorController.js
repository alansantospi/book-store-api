import { author } from '../models/author.js';

class AuthorController {
  // Get list of authors
  static async listAuthors(req, res) {
    try {
      const authors = await author.find({});
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const authorFound = await author.findById(id);
      res.status(200).json({ message: 'Author found', author: authorFound });
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Author successfully updated' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to update author` });
    }
  }

  static async createAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: 'Author successfully created', author: newAuthor });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create author` });
    }
  }

  static async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: 'Author successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to delete author` });
    }
  }
}

export default AuthorController;
