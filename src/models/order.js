import mongoose from 'mongoose';
import { userSchema } from './user.js';
import { bookSchema } from './book.js';

const orderSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  books: [bookSchema],
  user: userSchema,
}, { versionKey: false });

const order = mongoose.model('orders', orderSchema);

export default order;
