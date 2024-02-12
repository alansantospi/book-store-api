import { book } from '../models/book.js';
import { author } from '../models/author.js';

class BookController {
  // Get list of books
  static async listBooks(req, res) {
    try {
      const books = await book.find({});
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async getBookById(req, res) {
    try {
      const { id } = req.params;
      const bookFound = await book.findById(id);
      if (!bookFound) {
        return res.status(404).json({ message: `Book not found: ${id}` });
      }
      res.status(200).json({ message: 'Book found', book: bookFound });
    } catch (error) {
      res.status(500).json({ message: `${error} - Request failed` });
    }
  }

  static async updateBook(req, res) {
    try {
      const { id } = req.params;
      const bookFound = await book.findById(id);
      if (!bookFound) {
        return res.status(404).json({ message: `Book not found: ${id}` });
      }

      await book.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Book successfully updated' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to update book` });
    }
  }

  static async createBook(req, res) {
    const {body} = req;
    if (Object.keys(body).length === 0){
      return res.status(400).json({message: 'Empty request body'})
    }

    try {
      const authorFound = await author.findById(body.author);
      if (!authorFound) {
        return res.status(404).json({ message: `Author not found: ${body.author}` });
      }
      const fullBook = { ...body, author: { ...authorFound._doc } };
      const newBook = await book.create(fullBook);
      res.status(201).json({ message: 'Book successfully created', book: newBook });
    } catch (error) {
      res.status(500).json({ message: `${error.message} - Failed to create book` });
    }
  }

  static async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const bookFound = await book.findById(id);
      if (!bookFound) {
        return res.status(404).json({ message: 'Book not found' });
      }
      await book.findByIdAndDelete(id);

      res.status(200).json({ message: 'Book successfully deleted' });
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to delete book` });
    }
  }

  static async findBooksByTitle(req, res) {
    const { title } = req.query;
    try {
      const booksByTitle = await book.find({ title });
      res.status(200).json(booksByTitle);
    } catch (error) {
      res.status(500).json({ message: `${error} - Failed to search books` });
    }
  }
}

export default BookController;
