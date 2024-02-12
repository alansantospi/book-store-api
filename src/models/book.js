import mongoose from 'mongoose';
import { authorSchema } from './author.js';

const bookSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: { type: String, required: true },
  year: { type: Number },
  pages: { type: Number },
  price: { type: Number },
  author: authorSchema,
}, { versionKey: false });

const book = mongoose.model('books', bookSchema);

export { book, bookSchema };
